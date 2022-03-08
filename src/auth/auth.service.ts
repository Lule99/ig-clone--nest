import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, LoginDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { generateSalt } from './salt';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class AuthService {
  constructor(
    private imageService: ImagesService,
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: AuthDto) {
    const salt = generateSalt(8);
    const pswHash = await argon.hash(dto.password + salt);

    const bla = this.imageService.uploadImage(dto.profilePicture, 1, 'user');
    
    if(dto.password !== dto.repeatedPassword)
      throw new ForbiddenException(`Password1 and Password2 dont match.`);

    try {
      /////////////////////////////////////////////////////////////////////////////POOOSTTTTTTTT!!!
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: pswHash,
          salt: salt,
          email: dto.email,
          profile: {
              create: {
                name:dto.name,
                bio:dto.bio,
                profilePiture:"pathDoSlike",
                posts: {
                  create: {
                    text: 'prvi post'
                  }
                }
              }
          }
        },
      });

      return this.signToken(user.username);

    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          //P2002 duplicate field
          //console.log(JSON.stringify(err));
          const info: any = err.meta;
          throw new ForbiddenException(`${info.target} already taken!`);
        }
      }
    }
  }


  
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials!');

    const password = dto.password;
    const salt = user.salt;
    const passwordCheck = await argon.verify(user.password, password + salt);

    if (!passwordCheck) throw new ForbiddenException('Invalid credentials!');
    return await this.signToken(user.username);
  }



  async signToken(username: string): Promise<{ token: string }> {
    const jwtBody = {
      sub: username,
    };

    const token = await this.jwt.signAsync(jwtBody, {
      expiresIn: '365d',
      secret: this.config.get('JWT_SECRET'),
    });

    return { token: token };
  }
}

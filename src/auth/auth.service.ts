import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, LoginDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: AuthDto) {
    const pswHash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: pswHash,
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken(user.username);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          //P2002 duplicate field
          throw new ForbiddenException('Username already taken!');
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

    const passwordCheck = await argon.verify(user.password, dto.password);

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

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto, LoginDto, ResetPasswordDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { generateStringHash } from 'src/helpers/utils/generators';
import { MailService } from 'src/helpers/mail/mail.service';
import Constants from 'src/helpers/utils/constants';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailService: MailService,
  ) {}

  async register(dto: AuthDto) {
    const salt = generateStringHash(8);
    const pswHash = await argon.hash(dto.password + salt);

    if (dto.password !== dto.repeatedPassword)
      throw new ForbiddenException(`Password1 and Password2 dont match.`);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: pswHash,
          salt: salt,
          email: dto.email,
          profile: {
            create: {
              name: dto.name,
              bio: dto.bio,
              profilePicture: dto.profilePicture,
            },
          },
        },
      });

      return this.signToken(user.username, 365);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
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
    return await this.signToken(user.username, 365);
  }

  async signToken(
    username: string,
    expiresInDays: number,
  ): Promise<{ token: string }> {
    const jwtBody = {
      sub: username,
    };
    const token = await this.jwt.signAsync(jwtBody, {
      expiresIn: `${expiresInDays}d`,
      secret: this.config.get(Constants.jwtSecret),
    });

    return { token: token };
  }

  async initializePasswordReset(email: string) {
    const link = await this.generatePasswordResetLink(email);
    const from = Constants.resetPassword.resetMailFrom;
    const to = email;
    const subject = Constants.resetPassword.resetMailSubject;
    const text = `${Constants.resetPassword.resetMailText}${link}`;
    this.mailService.sendMail(from, to, subject, text);
  }

  async generatePasswordResetLink(email: string): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user)
      throw new BadRequestException(
        `User with email: ${email} does not exist!`,
      );
    const token = await this.signToken(user.username, 1);

    return `${Constants.resetPassword.reselLinkBase}${token.token}`;
  }

  async resetPassword(user: User, dto: ResetPasswordDto) {
    if (dto.password !== dto.repeatedPassword)
      throw new BadRequestException('Passwords do not match');

    const hash = await argon.hash(dto.password + user.salt);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });

    return await this.signToken(user.username, 1);
  }
}

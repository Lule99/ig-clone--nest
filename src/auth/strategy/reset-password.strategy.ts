import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Constants from 'src/helpers/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResetPasswordStrategy extends PassportStrategy(Strategy, Constants.reset_jwt) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: config.get(Constants.jwtSecret),
    });
  }

  async validate(payload: { sub: string }) {
    const user : User = await this.prisma.user.findUnique({
      where: {
        username: payload.sub,
      },
    });


    if (user) return user;

    return null;
  }
}

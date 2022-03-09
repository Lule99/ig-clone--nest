import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Constants from 'src/helpers/utils/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Constants.simple_jwt) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    /* console.log("***********\n"+ExtractJwt.fromUrlQueryParameter("token")) */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(Constants.jwtSecret),
    });
  }

  async validate(payload: { sub: string }) {
    const profile : Profile = await this.prisma.user.findUnique({
      where: {
        username: payload.sub,
      },
    }).profile();


    if (profile) return profile;

    return null;
  }
}

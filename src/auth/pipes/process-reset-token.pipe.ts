import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import jwtDecode from 'jwt-decode';
import { User } from '@prisma/client';

@Injectable()
export class ProcessResetTokenPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(token: any, metadata: ArgumentMetadata) {
    const payload: { sub: string; iat: number; exp: number } = jwtDecode(token);

    if (this.isExpired(payload.exp))
      throw new BadRequestException(
        'Token Expired. Please request a new password-reset token.',
      );

    var user: User = await this.prisma.user.findUnique({
      where: {
        username: payload.sub,
      },
    });

    return user ? user : null;
  }

  isExpired(numericDate: number): boolean {
    if (!numericDate) return true;

    return Date.now() > numericDate * 1000;
  }
}

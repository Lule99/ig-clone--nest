import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ImagesModule } from 'src/images/images.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/index'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [UserModule, ImagesModule, JwtModule.register({})]
})
export class AuthModule { }

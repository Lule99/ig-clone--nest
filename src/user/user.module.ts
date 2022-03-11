import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class UserModule {}

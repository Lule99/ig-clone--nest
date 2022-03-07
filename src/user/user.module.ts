import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ProfileService],
  exports: [UserService, ProfileService]
})
export class UserModule {}

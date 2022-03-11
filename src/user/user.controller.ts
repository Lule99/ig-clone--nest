import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { GetProfile } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto';
import { ProfileService } from './profile.service';

@Controller('api/user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private profileService: ProfileService) {}

  @Get()
  searchUser(@Query('query') query: string) {
    return this.profileService.search(query);
  }

  @Get('profile-info')
  getProfileInfo(@Query('username') username: string) {
    return this.profileService.getProfileInfo(username);
  }

  @Get('follow-check')
  checkIfUserFollowsUser(
    @Query('username') username: string,
    @Query('followedUsername') followedUsername: string,
  ) {
    return this.profileService.followCheck(username, followedUsername);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  updateUser(@GetProfile() user: User, @Body() dto: UpdateUserDto) {
    return this.profileService.updateUser(user, dto);
  }

  @Post('follow')
  @HttpCode(HttpStatus.ACCEPTED)
  followUser(
    @GetProfile() profile: Profile,
    @Query('otherUsername') otherUsername: string,
  ) {
    return this.profileService.follow(profile, otherUsername);
  }

  @Post('unfollow')
  @HttpCode(HttpStatus.ACCEPTED)
  unfollowUser(
    @GetProfile() profile: Profile,
    @Query('otherUsername') otherUsername: string,
  ) {
    this.profileService.unfollow(profile, otherUsername);
  }
}

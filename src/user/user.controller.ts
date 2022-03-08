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
import { ChangePasswordDto, UpdateUserDto } from './dto';
import { ProfileService } from './profile.service';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  @Post('change-password')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtGuard)
  changePassword(@GetProfile() user: User, @Body() dto: ChangePasswordDto) {
    return 'changePassword';
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.ACCEPTED)
  resetPassword(@Query('email') email: string) {
    //TODO
    return email;
  }

  @Post('change-password-token')
  @HttpCode(HttpStatus.ACCEPTED)
  changePasswordWithToken(@Query('token') token: string) {
    return token;
  }

  @Get()
  searchUser(@Query('query') query: string) {
    return this.profileService.search(query);
  }

  @Get('profile-info')
  @UseGuards(JwtGuard)
  getProfileInfo(@Query('username') username: string) {
    return this.profileService.getProfileInfo(username);
  }

  @Get('follow-check')
  @UseGuards(JwtGuard)
  checkIfUserFollowsUser(
    @Query('username') username: string,
    @Query('followedUsername') followedUsername: string,
  ) {
    
    return this.profileService.followCheck(username, followedUsername);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtGuard)
  updateUser(@GetProfile() user: User, @Body() dto: UpdateUserDto) {
    return this.profileService.updateUser(user, dto);
  }

  @Post('follow')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtGuard)
  followUser(
    @GetProfile() profile: Profile,
    @Query('otherUsername') otherUsername: string,
  ) {
    
    return this.profileService.follow(profile, otherUsername);
  }

  @Post('unfollow')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtGuard)
  unfollowUser(
    @GetProfile() profile: Profile,
    @Query('otherUsername') otherUsername: string,
  ) {
    this.profileService.unfollow(profile, otherUsername)
  }
}

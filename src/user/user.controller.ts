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
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
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
  changePassword(@GetUser() user: User, @Body() dto: ChangePasswordDto) {
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
    return query;
  }

  @Get('profile-info')
  @UseGuards(JwtGuard)
  getProfileInfo(@GetUser() user: User, @Query('username') username: string) {
    return username;
  }

  @Get('follow-check')
  @UseGuards(JwtGuard)
  checkIfUserFollowsUser(
    @Query('username') username: string,
    @Query('followedUsername') followedUsername: string,
  ) {
    return username + '|' + followedUsername;
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtGuard)
  updateUser(@GetUser() user: User, @Body() dto: UpdateUserDto) {
    return 'updateUser';
  }

  @Post('follow')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtGuard)
  followUser(
    @GetUser() user: User,
    @Query('otherUsername') otherUsername: string,
  ) {
    return 'follow ' + otherUsername;
  }

  @Post('unfollow')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtGuard)
  unfollowUser(
    @GetUser() user: User,
    @Query('otherUsername') otherUsername: string,
  ) {
    return 'unfollow ' + otherUsername;
  }
}

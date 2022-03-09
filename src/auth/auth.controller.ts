import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { JwtGuard } from './guard';
import { GetProfile } from './decorator';
import { Profile, User } from '@prisma/client';
import { ProcessProfileImagePipe } from './pipes/process-profile-image.pipe';

@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body(ProcessProfileImagePipe) dto: AuthDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtGuard)
  @Get('test')
  test(@GetProfile() profile: Profile) {
    return `GuardWorks:${profile.bio}`;
  }
}

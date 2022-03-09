import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { JwtGuard } from './guard';
import { GetProfile } from './decorator';
import { Profile, User } from '@prisma/client';
import { ProcessProfileImagePipe } from './pipes/process-profile-image.pipe';
import { MailService } from 'src/helpers/mail/mail.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body(ProcessProfileImagePipe) dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Get('reset-password')
  @HttpCode(HttpStatus.ACCEPTED)
  resetPassword(@Query('email') email: string) {
    this.authService.initializePasswordReset(email);
    return "Email successfully generated";
  }

  @Post('change-password-token')
  @HttpCode(HttpStatus.ACCEPTED)
  changePasswordWithToken(@Query('token') token: string) {
    return token;
  }


  @UseGuards(JwtGuard)
  @Get('test')
  test(@GetProfile() profile: Profile) {
    return `GuardWorks:${profile.bio}`;
  }
}

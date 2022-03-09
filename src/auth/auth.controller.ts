import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto, ResetPasswordDto } from './dto';
import { JwtGuard, ResetPassword } from './guard';
import { GetProfile, GetUser } from './decorator';
import { Profile, User } from '@prisma/client';
import { ProcessProfileImagePipe } from './pipes/process-profile-image.pipe';
import { MailService } from 'src/helpers/mail/mail.service';
import { ProcessResetTokenPipe } from './pipes/process-reset-token.pipe';

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
    return 'Email successfully generated';
  }

  @Post('change-password-token')
  @HttpCode(HttpStatus.ACCEPTED)
  changePasswordWithToken(
    @Query('token', ProcessResetTokenPipe) user: User,
    @Body() dto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(user, dto);
  }

}

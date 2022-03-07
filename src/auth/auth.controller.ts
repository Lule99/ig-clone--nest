import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';

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
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtGuard)
  @Get('test')
  test(@GetUser() user : User) {
    return `GuardWorks:${user.email}`
      
  }
}

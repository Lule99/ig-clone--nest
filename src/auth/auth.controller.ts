import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Request } from 'express'

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

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  test(@Req() req : Request) {
    const userPayload : any = req.user
      return `Guard Works! User:${userPayload.sub}`
  }
}

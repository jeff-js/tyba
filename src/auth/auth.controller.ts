import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.email, user.password);
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.authService.createUser(user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('currentUser')
  async getCurrentUser(@Req() req) {
    return req.user;
  }
}

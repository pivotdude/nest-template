import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/SignUp.dto';
import { Public } from './pubilc.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('profile')
  getUser(@Request() req) {
    console.log('reqUser', req.user);
    return req.user;
  }

}

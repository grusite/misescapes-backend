import {
  Body,
  Controller,
  Res,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthCreateUserDto } from './dto/authCreateUser.dto';
import { AuthLoginUserDto } from './dto/authLoginUser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201 })
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCreateUserDto: AuthCreateUserDto,
    @Res() res,
  ): Promise<void> {
    await this.authService.signUp(authCreateUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'Registered OK',
    });
  }

  @ApiBody({ type: AuthLoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }
}

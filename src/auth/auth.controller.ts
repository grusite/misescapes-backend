import {
  Body,
  Controller,
  Get,
  BadRequestException,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtPayload } from './interfaces/payload.interface';
import { SignupStatus } from './interfaces/signupStatus.interface';
import { LoginStatus } from './interfaces/loginStatus.interface';
// import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201 })
  @Post('/signup')
  public async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<SignupStatus> {
    const result: SignupStatus = await this.authService.signUp(createUserDto);

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return result;
  }

  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  public async signIn(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginStatus> {
    return this.authService.signIn(loginUserDto);
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async getMe(@Request() req: any): Promise<JwtPayload> {
    return req.user;
  }
}

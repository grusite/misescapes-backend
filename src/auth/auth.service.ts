import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { UserDto } from '../users/dto/user.dto';
import { JwtPayload } from './interfaces/JwtPayload.interface';
import { SignupStatus } from './interfaces/signupStatus.interface';
import { LoginStatus } from './interfaces/loginStatus.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<SignupStatus> {
    const status: SignupStatus = {
      success: true,
      message: 'user registered successfuly',
    };

    try {
      await this.usersService.create(createUserDto);
    } catch (err) {
      throw err;
    }

    return status;
  }

  async signIn(userDto: UserDto): Promise<LoginStatus> {
    const token = this._createToken(userDto);

    return {
      email: userDto.email,
      ...token,
    };
  }

  async validateUserByLogin(loginUserDto: LoginUserDto): Promise<UserDto> {
    const user = await this.usersService.findByLogin(loginUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validateUserByPayload(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  private _createToken({ id, email }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const userPayload: JwtPayload = { id, email };
    const accessToken = this.jwtService.sign(userPayload);
    return {
      expiresIn,
      accessToken,
    };
  }
}

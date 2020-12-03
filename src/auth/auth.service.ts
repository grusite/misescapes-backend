import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { UserDto } from '../users/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';
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
    let status: SignupStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.create(createUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
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

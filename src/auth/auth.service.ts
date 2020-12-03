import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCreateUserDto } from './dto/authCreateUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCreateUserDto: AuthCreateUserDto): Promise<void> {
    const { email, name, password } = authCreateUserDto;
    const user = new this.userModel({ email, name, password });
    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async signIn(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new ForbiddenException('User not registered');
    }

    if (!(await user.comparePassword(pass))) {
      throw new ForbiddenException('Invalid password');
    }
    return user;
  }
}

import {
  Injectable,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { UserDto } from '../users/dto/user.dto';
import { toUserDto } from '../lib/mapper';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(options?: Record<string, unknown>): Promise<UserDto> {
    const user = await this.userModel.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new ForbiddenException('User not registered');
    }

    if (!(await user.comparePassword(password))) {
      throw new ForbiddenException('Invalid password');
    }
    return toUserDto(user);
  }

  async findByPayload({ id, email }: any): Promise<UserDto> {
    return await this.findOne({ _id: id, email });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, name, password } = createUserDto;

    const user = new this.userModel({ email, name, password });
    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }

    return toUserDto(user);
  }

  private _sanitizeUser(user: UserDocument) {
    delete user.password;
    return user;
  }
}

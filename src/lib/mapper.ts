import { UserDocument } from '../users/schemas/user.schema';
import { UserDto } from '../users/dto/user.dto';

export const toUserDto = (data: UserDocument): UserDto => {
  const { id, name, email } = data;

  const userDto: UserDto = {
    id,
    name,
    email,
  };

  return userDto;
};

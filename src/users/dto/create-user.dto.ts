import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/entity/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'name',
  'nickname',
  'salt',
] as const) {}

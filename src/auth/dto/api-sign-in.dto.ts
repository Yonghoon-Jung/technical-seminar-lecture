import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/entity/user.entity';

export class ApiSignInDto extends PickType(User, [
  'idx',
  'name',
  'nickname',
  'photoUrl',
  'email',
  'platformIdx',
] as const) {}

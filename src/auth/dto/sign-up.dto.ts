import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entity/user.entity';

export class SignUpDto extends PickType(User, [
  'email',
  'name',
  'nickname',
] as const) {
  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @IsString()
  password: string;
}

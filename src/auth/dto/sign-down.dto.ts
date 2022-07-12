import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class SignDownDto extends PickType(SignUpDto, ['password']) {}

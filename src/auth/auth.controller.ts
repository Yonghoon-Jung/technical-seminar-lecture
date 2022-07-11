import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HTTP_STATUS_CODE } from 'src/common/configs/status.config';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { FilteredUser } from './interfaces/filtered-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HTTP_STATUS_CODE.success.created)
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    const response = this.authService.signUp(signUpDto);

    return response;
  }

  @HttpCode(HTTP_STATUS_CODE.success.ok)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const user: FilteredUser = await this.authService.signIn(signInDto);
    const response: string = this.authService.getCookieWithJwtToken(user.email);

    return { response };
  }
}

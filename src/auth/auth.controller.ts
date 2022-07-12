import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HTTP_STATUS_CODE } from 'src/common/configs/status.config';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';
import { SignDownDto } from './dto/sign-down.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { FilteredUser } from './interfaces/filtered-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HTTP_STATUS_CODE.success.created)
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const response = await this.authService.signUp(signUpDto);

    return { response };
  }

  @HttpCode(HTTP_STATUS_CODE.success.ok)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const user: FilteredUser = await this.authService.signIn(signInDto);
    const response: string = this.authService.getCookieWithJwtToken(user);

    return { response };
  }

  // 필요하면 기능 개발
  // @HttpCode(HTTP_STATUS_CODE.success.ok)
  // @Post('sign-out')
  // async signOut() {
  //   return '';
  // }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HTTP_STATUS_CODE.success.noContent)
  @Post('sign-down')
  async signDown(
    @CurrentUser() loginUser: User,
    @Body() signDownDto: SignDownDto,
  ) {
    await this.authService.signDown(loginUser, signDownDto);
  }
}

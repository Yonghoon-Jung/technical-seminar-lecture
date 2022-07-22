import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResponseDto } from 'src/common/dtos/all-response.dto';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import JwtRefreshGuard from 'src/common/guards/jwt-refresh.guard';
import { User } from 'src/users/entity/user.entity';
import { ApiSignInService } from './auth-api-platform.service';
import { AuthService } from './auth.service';
import { SignDownDto } from './dto/sign-down.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { FilteredUser } from './interfaces/filtered-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    // private readonly authService: AuthService,
    private readonly apiSignInService: ApiSignInService,
  ) {}

  // @HttpCode(HttpStatus.CREATED)
  // @Post('sign-up')
  // async signUp(@Body() signUpDto: SignUpDto) {
  //   const response = await this.authService.signUp(signUpDto);

  //   return { response };
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('sign-in')
  // async signIn(@Body() signInDto: SignInDto) {
  //   const user: FilteredUser = await this.authService.signIn(signInDto);
  //   const accessToken: string = this.authService.getJwtToken(user);
  //   const refreshToken: string = await this.authService.getJwtRefreshToken(
  //     user,
  //   );
  //   const response = {
  //     accessToken,
  //     refreshToken,
  //   };

  //   return { response };
  // }

  // 필요하면 기능 개발
  // @HttpCode(.success.ok)
  // @Post('sign-out')
  // async signOut() {
  //   return '';
  // }

  // @UseGuards(JwtAuthenticationGuard)
  // @HttpCode(HttpStatus.CREATED)
  // @Post('sign-down')
  // async signDown(
  //   @CurrentUser() loginUser: User,
  //   @Body() signDownDto: SignDownDto,
  // ) {
  //   await this.authService.signDown(loginUser, signDownDto);
  // }

  // @UseGuards(JwtRefreshGuard)
  // @Get('refresh')
  // refresh(@CurrentUser() loginUser: User) {
  //   const accessTokenCookie = this.authService.getJwtRefreshToken(loginUser);

  //   return accessTokenCookie;
  // }

  /*
  ###### 카카오 로그인 API
  */
  @UseGuards(AuthGuard('kakao'))
  @HttpCode(HttpStatus.OK)
  @Get('kakao')
  kakaoSignIn(): void {
    return;
  }

  @UseGuards(AuthGuard('kakao'))
  @HttpCode(HttpStatus.OK)
  @Get('kakao/redirect')
  async kakaoSignInRedirect(@Req() req: Request): Promise<ResponseDto> {
    const { accessToken, ...kakaoUser }: any = req.user;

    await this.apiSignInService.saveApiSignInInformation(kakaoUser);

    return { accessToken };
  }

  @UseGuards(AuthGuard('kakao'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('kakao')
  async kakaoSignDown(@Req() req: Request) {
    console.log(req.header);
  }

  /*
  ###### 구글 로그인 API
  */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google')
  googleSignIn(): void {
    return;
  }

  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  async googleSignInRedirect(@Req() req: Request): Promise<ResponseDto> {
    const { accessToken, ...googleUser }: any = req.user;

    await this.apiSignInService.saveApiSignInInformation(googleUser);

    return { accessToken };
  }

  /*
  ###### 네이버 로그인 API
  */
  @UseGuards(AuthGuard('naver'))
  @HttpCode(HttpStatus.OK)
  @Get('naver')
  naverSignIn(): void {
    return;
  }

  @UseGuards(AuthGuard('naver'))
  @HttpCode(HttpStatus.OK)
  @Get('naver/redirect')
  async naverSignInRedirect(@Req() req: Request): Promise<ResponseDto> {
    const { accessToken, ...naverUser }: any = req.user;

    await this.apiSignInService.saveApiSignInInformation(naverUser);

    return { accessToken };
  }
}

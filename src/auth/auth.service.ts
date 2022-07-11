import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/users/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { FilteredUser } from './interfaces/filtered-user.interface';
import { SignDownDto } from './dto/sign-down.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, ...userInfo }: SignUpDto = signUpDto;
    const isEmailMatching = await this.usersRepository.getByEmail(
      userInfo.email,
    );

    if (!!isEmailMatching) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    userInfo['salt'] = hashedPassword;

    const signUpResult = await this.usersRepository.createUser(userInfo);

    return signUpResult;
  }

  async signIn({ email, password }: SignInDto): Promise<FilteredUser> {
    const user: FilteredUser = await this.confirmWithEmailAndPassword(
      email,
      password,
    );

    return user;
  }

  async signDown({ email }: User, { password }: SignDownDto) {
    const user: FilteredUser = await this.confirmWithEmailAndPassword(
      email,
      password,
    );
    const softDeletedResult = await this.usersRepository.softDeleteUser(user);

    return user;
  }

  async confirmWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<FilteredUser> {
    const user: User = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestException('아이디 없음');
    }

    const { salt, ...filteredUser }: any = user;
    const isPasswordMatching: boolean = await bcrypt.compare(password, salt);

    if (!isPasswordMatching) {
      throw new BadRequestException('비밀번호 불일치');
    }

    return filteredUser;
  }

  getCookieWithJwtToken(user: FilteredUser): string {
    const payload: TokenPayload = user;
    const token = this.jwtService.sign(payload);

    return token;
  }
}

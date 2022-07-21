import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from 'src/common/configs/jwt.config';
import { NewTypeOrmModule } from 'src/common/configs/new-orm.module';
import { UsersRepository } from 'src/users/repository/users.repository';
import { KakaoUserServcie } from './auth-kakao.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Kakao } from './entities/auth-kakao.entity';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kakao]),
    NewTypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    KakaoStrategy,
    KakaoUserServcie,
  ],
})
export class AuthModule {}

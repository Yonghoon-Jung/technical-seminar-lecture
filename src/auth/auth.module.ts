import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from 'src/common/configs/jwt.config';
import { NewTypeOrmModule } from 'src/common/configs/new-orm.module';
import { UsersRepository } from 'src/users/repository/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    NewTypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}

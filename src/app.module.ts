import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { envConfig } from './common/configs/env.config';
import { ormConfigOptions } from './common/configs/orm.config';
import { UsersModule } from './users/users.module';
import { LecturesModule } from './lectures/lectures.module';
import { UserPhotoModule } from './user-photo/user-photo.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(ormConfigOptions),
    AuthModule,
    UsersModule,
    LecturesModule,
    UserPhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {}

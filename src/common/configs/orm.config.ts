import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Lecture } from 'src/lectures/entity/lecture.entity';
import { UserPhoto } from 'src/user-photo/entity/user-photo.entity';
import { User } from 'src/users/entity/user.entity';

export const ormConfigOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
    logging: configService.get<boolean>('DB_LOGGING'),
    entities: [User, Lecture, UserPhoto],
  }),
};

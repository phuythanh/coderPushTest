import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserLike } from './entities/userLike.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthorizationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

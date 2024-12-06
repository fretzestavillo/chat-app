import { Module } from '@nestjs/common';
import { ChatModule } from './app/chatmodule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './app/tools/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.19.16.1',
      port: 5432,
      username: 'file',
      password: 'file',
      database: 'file',
      entities: [UserEntity],
      synchronize: true,
    }),
    ChatModule,
  ],
})
export class MainModule {}

import { Module } from '@nestjs/common';
import { ChatModule } from './app/chatmodule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './app/tools/user.entity';
import { ChatEntity } from './app/tools/chat.entity';
import { MessageEntity } from './app/tools/message.entity';
import { RedisModule } from './app/gateway/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.19.16.1',
      port: 5432,
      username: 'file',
      password: 'file',
      database: 'file',
      entities: [UserEntity, ChatEntity, MessageEntity],
      synchronize: true,
    }),
    RedisModule,
    ChatModule,
  ],
})
export class MainModule {}

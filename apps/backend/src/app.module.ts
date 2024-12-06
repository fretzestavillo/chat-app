import { Module } from '@nestjs/common';
import { ChatModule } from './app/chatmodule';
import { ChatEntity } from './app/tools/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.19.16.1',
      port: 5432,
      username: 'file',
      password: 'file',
      database: 'file',
      entities: [ChatEntity],
      synchronize: true,
    }),
    ChatModule,
  ],
})
export class MainModule {}

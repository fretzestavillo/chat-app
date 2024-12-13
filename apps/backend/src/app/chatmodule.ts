import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { GatewayModule } from './gateway/gateway.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './tools/user.entity';
import { ChatEntity } from './tools/chat.entity';
import { PrivateEntity } from './tools/private.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ChatEntity, PrivateEntity]), GatewayModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

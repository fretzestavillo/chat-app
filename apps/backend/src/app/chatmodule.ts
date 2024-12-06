import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { GatewayModule } from './gateway/gateway.module';
import { ChatEntity } from './tools/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity]), GatewayModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

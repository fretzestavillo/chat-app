import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { GatewayModule } from './gateway/gateway.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './tools/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), GatewayModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

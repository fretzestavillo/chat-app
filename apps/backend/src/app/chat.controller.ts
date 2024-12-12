import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SignUpInput } from './tools/signup.input';
import { UserEntity } from './tools/user.entity';
import { ChatEntity } from './tools/chat.entity';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('signup')
  postDataSignUp(@Body() userInput: SignUpInput): Promise<UserEntity> {
    return this.chatService.postDataSignUp(userInput);
  }

  @Post('login')
  postDataLogin(@Body() userInput: SignUpInput): Promise<UserEntity | 'false'> {
    return this.chatService.postDataLogin(userInput);
  }

  @Get('chat')
  getData(): Promise<ChatEntity[]> {
    return this.chatService.getAllMessages();
  }
}

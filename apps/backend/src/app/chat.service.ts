import { Injectable } from '@nestjs/common';
import { SignUpInput } from './tools/signup.input';
import { ChatEntity } from './tools/chat.entity';
import { And, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatEntity: Repository<ChatEntity>
  ) {}

  async postDataSignUp(signUpInput: SignUpInput): Promise<ChatEntity> {
    console.log('service');

    const chatEntity = new ChatEntity();
    chatEntity.firstName = signUpInput.firstName;
    chatEntity.lastName = signUpInput.lastName;

    await this.chatEntity.save(chatEntity);
    return chatEntity;
  }

  async postDataLogin(signUpInput: SignUpInput): Promise<ChatEntity | 'false'> {
    const { firstName, lastName } = signUpInput;
    const found = await this.chatEntity.findOne({
      where: { firstName: firstName, lastName: lastName },
    });

    return !found ? 'false' : found;
  }
}

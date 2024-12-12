import { Injectable } from '@nestjs/common';
import { SignUpInput } from './tools/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './tools/user.entity';
import { ChatEntity } from './tools/chat.entity';
import { CreateMessage } from './tools/type';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    @InjectRepository(ChatEntity)
    private chatEntity: Repository<ChatEntity>
  ) {}

  async postDataSignUp(signUpInput: SignUpInput): Promise<UserEntity> {
    const chatEntity = new UserEntity();
    chatEntity.firstName = signUpInput.firstName;
    chatEntity.lastName = signUpInput.lastName;

    await this.userEntity.save(chatEntity);
    return chatEntity;
  }

  async postDataLogin(signUpInput: SignUpInput): Promise<UserEntity | 'false'> {
    const { firstName, lastName } = signUpInput;
    const found = await this.userEntity.findOne({
      where: { firstName: firstName, lastName: lastName },
    });

    return !found ? 'false' : found;
  }

  async createMessage(data: CreateMessage) {
    const messageEntity = new ChatEntity();
    messageEntity.sender = data.sender;
    messageEntity.message = data.message;

    await this.chatEntity.save(messageEntity);
    return messageEntity;
  }

  async getAllMessages(): Promise<ChatEntity[]> {
    return this.chatEntity.find();
  }
}

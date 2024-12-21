import { Injectable } from '@nestjs/common';
import { SignUpInput } from './tools/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './tools/user.entity';
import { ChatEntity } from './tools/chat.entity';
import { CreateMessage, CreatePrivateMessage, PrivatePeople } from './tools/type';
import { PrivateEntity } from './tools/private.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    @InjectRepository(ChatEntity)
    private chatEntity: Repository<ChatEntity>,


    @InjectRepository(PrivateEntity)
    private privateEntity: Repository<PrivateEntity>
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

  
  async getAllMessages(): Promise<ChatEntity[]> {
    return this.chatEntity.find();
  }
  
  // async getPrivateMessages(data: PrivatePeople): Promise<PrivateEntity[]> {
  //   const sender = data.sender
  //   const recipient = data.recipient
  //   console.log('here at service')
  //   console.log(data.recipient)
  //   console.log(data.sender)

  //   return this.privateEntity.find();
  // }

  async getPrivateMessages(sender: string, recipient: string): Promise<PrivateEntity[]> {
    return this.privateEntity.find({
      where: [
        { sender, recipient },
        { sender: recipient, recipient: sender },
      ],
      order: { created_at: 'ASC' },
    });
  }
  
  
  async createMessage(data: CreateMessage) {
    const messageEntity = new ChatEntity();
    messageEntity.sender = data.sender;
    messageEntity.message = data.message;

    await this.chatEntity.save(messageEntity);
    return messageEntity;
  }

  async createPrivateMessage(data: CreatePrivateMessage) {

   

    const privateEntity = new PrivateEntity();
    privateEntity.sender = data.sender;
    privateEntity.recipient = data.recipient;
    privateEntity.messageContent  = data.messageContent;
    
    await this.privateEntity.save(privateEntity);
    return privateEntity;
  }


  async getAllUsers(): Promise<UserEntity[]> {
    return this.userEntity.find();
  }
}

import { Injectable } from '@nestjs/common';
import { SignUpInput } from './tools/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './tools/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>
  ) {}

  async postDataSignUp(signUpInput: SignUpInput): Promise<UserEntity> {
    console.log('service');

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
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  isGroup: boolean;

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ChatEntity } from './chat.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  sender: UserEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  chat: ChatEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;
}

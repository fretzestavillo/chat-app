import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePrivateMessage, Inputs } from '../tools/type';
import { Inject, Logger } from '@nestjs/common';
import { ChatService } from '../chat.service';
import { PrivateEntity } from '../tools/private.entity';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class MyGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @Inject()
  private chatService: ChatService;
  private privateEntity: PrivateEntity
  private logger: Logger = new Logger('MyGateway');
  private count = 0;
  private storeUser: string[] = [];
  private userSockets: Map<string, string> = new Map();

  @WebSocketServer()
  private server: Server;

  afterInit(server: Socket) {
    this.logger.log(` 🚀 MyGateway is running on: http://localhost:3002`);
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    this.count += 1;
    this.logger.log(`Connected: ${this.count} connection}`);
  }

  async handleDisconnect(client: Socket) {
    this.count -= 1;
    this.logger.log(`Disconnected: ${this.count} connections`);
  }

  
  @SubscribeMessage('getOnlineUser')
  getOnlineUser(client: Socket, data: any) {
    this.storeUser.push(data);
    const finalData = this.storeUser;
    this.server.emit('getOnlineUserfromserver', finalData);
  }
  
  @SubscribeMessage('register_user')
  registerOnlineUser(client: Socket, username: string) {
    this.userSockets.set(username, client.id);
    console.log(`User ${username} registered with socket ID ${client.id}`);
  }
  @SubscribeMessage('messageToServer')
  async GroupChat(client: Socket, data: Inputs) {
    const createdmessages = await this.chatService.createMessage(data);
    this.server.emit('messageToClient', createdmessages);
  }

  @SubscribeMessage('private_chat')
 async privateMessages(client: Socket, data: CreatePrivateMessage) {
   const privateMessages = await this.chatService.createPrivateMessage(data);
   const recipientSocketId = this.userSockets.get(privateMessages.recipient);
   this.server.to(recipientSocketId).emit('private_message', privateMessages);
   client.emit('private_message', privateMessages);


  }



}

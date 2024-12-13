import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Inputs, MessageList } from '../tools/type';
import { Inject, Logger } from '@nestjs/common';
import { ChatService } from '../chat.service';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class MyGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @Inject()
  private chatService: ChatService;
  private logger: Logger = new Logger('MyGateway');
  private count: number = 0;
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

  @SubscribeMessage('messageToServer')
  async oneToOneMessage(client: Socket, data: Inputs) {
    const createdmessages = await this.chatService.createMessage(data);
    this.server.emit('messageToClient', createdmessages);
  }

  @SubscribeMessage('getOnlineUser')
  getOnlineUser(client: Socket, data: any) {
    this.storeUser.push(data);
    const finalData = this.storeUser;
    this.server.emit('getOnlineUserfromserver', finalData);
  }

  @SubscribeMessage('register_user')
  registerUser(client: Socket, username: string) {
    this.userSockets.set(username, client.id);
    console.log(`User ${username} registered with socket ID ${client.id}`);
  }

  @SubscribeMessage('private_chat')
  privateMessages(client: Socket, data: any) {
    const sender = data.from;
    const recipient = data.to;
    const message = data.message;

    console.log(`Message from ${sender} to ${recipient}: ${message}`);

    const recipientSocketId = this.userSockets.get(recipient);

    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('private_message', {
        sender,
        message,
      });
    } else {
      console.log(`User ${recipient} is not connected.`);
    }
  }
}

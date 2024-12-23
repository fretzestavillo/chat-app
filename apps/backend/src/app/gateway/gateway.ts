import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePrivateMessage, Inputs, OnlineUserv2 } from '../tools/type';
import { Inject, Logger } from '@nestjs/common';
import { ChatService } from '../chat.service';
import { UserEntity } from '../tools/user.entity';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class MyGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @Inject()
  private chatService: ChatService;
  private userEntity: UserEntity
  private logger: Logger = new Logger('MyGateway');
  private count = 0;
  private storeUser: string[] = [];
  private userSockets: Map<string, string> = new Map();
  private onlineUsers:  OnlineUserv2[] = []

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
  async getOnlineUser(client: Socket, data: any) {
    // get all users online 
    this.storeUser.push(data);
    const finalData = this.storeUser;
    this.server.emit('getOnlineUserfromserver', finalData);
    //get all users
    const getAllUsers = await this.chatService.getAllUsers();
    this.server.emit('getAllUsers', getAllUsers);

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

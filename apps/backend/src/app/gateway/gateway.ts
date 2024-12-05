import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
@WebSocketGateway(3002)
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New user connected..', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User Disconnected..', client.id);
  }

  // from client
  @SubscribeMessage('client')
  onNewMessage(client: Socket, message: any) {
    console.log(message);

    // for you
    client.emit('server', 'I am from server this is only for you');

    // for all
    this.server.emit(
      'server',
      'I server am broadcasting and this is for alllllllll....'
    );
  }
}

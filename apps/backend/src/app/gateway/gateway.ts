import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inputs } from '../tools/type';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class MyGateway {
  @WebSocketServer()
  server: Server;

  // from client
  @SubscribeMessage('client')
  //   handleEvent(@MessageBody() message: { name: string; message: string }) {
  handleMessage(client: any, message: Inputs) {
    this.server.emit('client', message); // Broadcast message to all connected clients
  }
}

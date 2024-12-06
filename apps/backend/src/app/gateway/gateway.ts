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

  //  GroupChat
  @SubscribeMessage('groupChat')
  groupMessage(client: any, message: Inputs) {
    this.server.emit('broadcastfromGC', message); // Broadcast message to all connected clients
  }

  //  1v1
  @SubscribeMessage('oneVone')
  oneToOneMessage(client: any, message: Inputs) {
    this.server.emit('broadcastfromoneVone', message); // Broadcast message to all connected clients
  }
}

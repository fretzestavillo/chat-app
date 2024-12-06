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

// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { Inject, Logger } from '@nestjs/common';
// import Redis from 'ioredis';
// import { Inputs } from '../tools/type';

// @WebSocketGateway(3002, { cors: { origin: '*' } })
// export class MyGateway {
//   @WebSocketServer() server: Server;
//   private logger = new Logger(MyGateway.name);

//   constructor(@Inject('REDIS') private readonly redisClient: Redis) {
//     // Subscribe to the Redis channel for broadcasting messages
//     this.redisClient.subscribe('groupChat', (err, count) => {
//       if (err) {
//         this.logger.error('Failed to subscribe to channel:', err);
//       } else {
//         this.logger.log(`Subscribed to ${count} channel(s).`);
//       }
//     });

//     // Handle messages from Redis
//     this.redisClient.on('message', (channel, message) => {
//       if (channel === 'groupChat') {
//         this.server.emit('broadcastfromGC', JSON.parse(message)); // Emit to all clients
//       }
//     });
//   }

//   // Group Chat
//   @SubscribeMessage('groupChat')
//   async groupMessage(client: any, message: Inputs) {
//     // Publish the message to the Redis channel for broadcasting
//     await this.redisClient.publish('groupChat', JSON.stringify(message));
//     // Broadcast message to all connected WebSocket clients
//     this.server.emit('broadcastfromGC', message);
//   }

//   // 1v1 chat
//   @SubscribeMessage('oneVone')
//   oneToOneMessage(client: any, message: Inputs) {
//     this.server.emit('broadcastfromoneVone', message); // Broadcast message to all connected clients
//   }
// }

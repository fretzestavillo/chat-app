import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: () =>
        new Redis({
          host: 'localhost',
          port: 6379,
        }),
    },
  ],
  exports: ['REDIS'], // Make Redis client globally available
})
export class RedisModule {}

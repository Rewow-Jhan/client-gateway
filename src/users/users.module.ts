import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config/services';

@Module({
  controllers: [UsersController],
  imports: [
    ClientsModule.register([
      { 
        name: AUTH_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
})

export class UsersModule {}

import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PETS_SERVICE, envs } from 'src/config';

@Module({
  controllers: [PetsController],
  imports: [
      ClientsModule.register([
        { 
          name: PETS_SERVICE, 
          transport: Transport.TCP,
          options: {
            host: envs.petsMicroserviceHost,
            port: envs.petsMicroservicePort,
          },
        },
      ]),
    ],
})
export class PetsModule {}

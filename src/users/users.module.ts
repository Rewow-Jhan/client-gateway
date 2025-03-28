import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, envs } from 'src/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/google-oauth';

@Module({
  controllers: [UsersController],
  providers: [GoogleStrategy],
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    ClientsModule.register([
      { 
        name: AUTH_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.authMicroserviceHost,
          port: envs.authMicroservicePort,
        },
      },
    ]),
  ],
})

export class UsersModule {}

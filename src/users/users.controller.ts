import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config';
import { CreateUserDto } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await firstValueFrom(
        this.authClient.send('create_user', createUserDto)
      )

      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

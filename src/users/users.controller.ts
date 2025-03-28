import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config';
import { CreateUserDto } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';
import { GoogleAuthGuard } from './google-auth/google-auth.guard';

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

  @UseGuards(GoogleAuthGuard)
  @Get('google-login')
  async googleLogin() {
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google-callback')
  async googleCallback(@Req() req) {
  }
}

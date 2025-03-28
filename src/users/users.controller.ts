import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @Post()
  createUser() {
    return 'This action adds a new user';
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PETS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('pets')
export class PetsController {
  constructor(
    @Inject(PETS_SERVICE) private readonly petsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsClient.send('createPet', createPetDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsClient.send('findPet', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) { 
    return this.petsClient.send('updatePet', updatePetDto);
  }
}

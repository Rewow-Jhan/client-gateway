import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsPositive, IsString } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @IsPositive()
  id: number;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  breed: string;

  @IsPositive()
  age: number;
}

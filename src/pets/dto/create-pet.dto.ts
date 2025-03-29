import { IsPositive, IsString } from "class-validator";

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  breed: string;

  @IsPositive()
  age: number;
}

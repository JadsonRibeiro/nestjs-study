import { Transform } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class User {
  @IsString()
  id: string;

  @IsNotEmpty()
  @MinLength(5, {
    context: {
      errorCode: 1001,
      developerNote: 'Uma nota qualquer para o desenvolvedor',
    },
  })
  name: string;

  @IsNotEmpty()
  @IsPositive()
  age: number;
}

export class CreateUserDTO extends OmitType(User, ['id']) {}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class FindUsersDTO {
  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  age: number;
}

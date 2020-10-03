import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PointDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  readonly whatsapp: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly uf: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty()
  readonly latitude: string;

  @ApiProperty()
  readonly longitude: string;

  @ApiProperty()
  readonly items: [];

  @ApiProperty()
  @IsString()
  image: string;
}
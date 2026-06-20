import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  university: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  yearsExperience: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  patientsNumber: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clinicsPlaces: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  consultationFees: number;

  @ApiPropertyOptional()
  @IsOptional()
  bookDate?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  partOfDay?: string;
}
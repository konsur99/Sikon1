import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRabItemDto {
  @ApiProperty({ example: 'Sewa venue lapangan' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber()
  volume: number;

  @ApiProperty({ example: 'Hari' })
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({ example: 5000000 })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ example: 'VENUE', required: false })
  @IsOptional()
  @IsString()
  expenseCategoryCode?: string;
}

export class CreateRabDto {
  @ApiProperty({ example: 'Kejuaraan Atletik Kota Surakarta' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'cabor-uuid-pasi' })
  @IsNotEmpty()
  @IsString()
  caborId: string;

  @ApiProperty({ example: 'activity-uuid', required: false })
  @IsOptional()
  @IsString()
  activityId?: string;

  @ApiProperty({ example: '2026-11-20' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-11-22' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 'Stadion Sriwedari, Surakarta', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'Penyelenggaraan kejuaraan atletik tingkat kota', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [CreateRabItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRabItemDto)
  items: CreateRabItemDto[];
}


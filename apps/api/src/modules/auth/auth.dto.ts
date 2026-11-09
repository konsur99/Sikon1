import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@koni-surakarta.id' })
  @IsNotEmpty({ message: 'Email atau username tidak boleh kosong' })
  identifier: string;

  @ApiProperty({ example: 'Password123!' })
  @IsNotEmpty({ message: 'Kata sandi tidak boleh kosong' })
  @MinLength(6, { message: 'Kata sandi minimal 6 karakter' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: {
    id: string;
    email: string;
    fullName: string;
    username: string;
    roles: string[];
    assignedCabors: { id: string; code: string; name: string }[];
  };
}


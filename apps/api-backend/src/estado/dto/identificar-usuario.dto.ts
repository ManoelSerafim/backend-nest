import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IdentificarUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
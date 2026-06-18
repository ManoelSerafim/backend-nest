import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  Equals,
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateInscricaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @Type(() => Number)
  @IsInt()
  @Min(16)
  @Max(120)
  idade: number;

  @Transform(({ value }) => {
    if (value === true || value === 'true' || value === 'on') return true;
    if (value === false || value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @Equals(true, { message: 'aceitaTermos deve ser verdadeiro' })
  aceitaTermos: boolean;

  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.length > 0) return [value];
    return value;
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  interesses: string[];

  @IsOptional()
  @IsString()
  observacoes?: string;
}
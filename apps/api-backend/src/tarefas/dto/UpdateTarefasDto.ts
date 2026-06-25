import {
  IsString,
  IsOptional,
  Min,
  Max,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export enum StatusTarefa {
  ABERTA = 'aberta',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDA = 'concluida',
}

export class UpdateTarefasDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsEnum(StatusTarefa)
  status?: StatusTarefa;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  prioridade?: number;
}

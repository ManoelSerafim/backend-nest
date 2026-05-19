import { IsString, IsOptional, Min, Max, IsNumber } from 'class-validator';

export class UpdateTarefas {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  status?: 'aberta' | 'em_andamento' | 'concluida';

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  prioridade?: number;
}

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class CreateTarefas {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descricao: string;

  @IsString()
  status: 'aberta' | 'em_andamento' | 'concluida';

  @Min(1)
  @Max(5)
  @IsNumber()
  prioridade: number;
}

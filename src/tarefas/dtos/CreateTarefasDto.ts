import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { StatusTarefa } from 'src/tarefas/dtos/UpdateTarefasDto';

export class CreateTarefasDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsEnum(StatusTarefa)
  status!: StatusTarefa;

  @Min(1)
  @Max(5)
  @IsNumber()
  prioridade!: number;
}

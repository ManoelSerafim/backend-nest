import { IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateEmprestimoDto {
  @IsString()
  patrimonio!: string;

  @IsString()
  @IsNotEmpty()
  solicitante!: string;

  @IsString()
  @IsNotEmpty()
  turma!: string;

  @IsString()
  dataEmprestimo!: string;

  @IsString()
  dataPrevistaDevolucao!: string;

  @IsString()
  @IsOptional()
  dataDevolucao?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ativo', 'devolvido', 'atrasado'])
  status!: 'ativo' | 'devolvido' | 'atrasado';
}

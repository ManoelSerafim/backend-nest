import { IsString } from 'class-validator';

export class UpdateEmprestimoDto {
  @IsString()
  dataDevolucao!: string;
}

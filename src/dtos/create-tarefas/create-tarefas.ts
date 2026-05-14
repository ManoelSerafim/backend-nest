import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateTarefas {
    @IsString()
    titulo!: string;

}

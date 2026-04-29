import { Controller, Get, Query, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    listar(@Query('idade') idade?: string){
        return this.usuariosService.listar(idade);
    }

    @Get(':id')
    buscarporId(@Param('id') id: string){
        if (isNaN(Number(id))) {
            return { error: 'ID deve ser um número' };
        }
        return this.usuariosService.buscarporId(Number(id));
    }

    @Post()
    criar(@Body() usuario: { nome: string; email: string; cpf: string, idade: string }) {
        if (!usuario.nome || !usuario.email || !usuario.cpf || !usuario.idade) {
            return { error: 'Campos obrigatórios: nome, email, cpf e idade' };
        }
        return this.usuariosService.criar(usuario);
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() usuario: { nome: string; email: string; cpf: string, idade: string }) {
        if (isNaN(Number(id))) {
            return { error: 'ID deve ser um número' };
        }
        return this.usuariosService.atualizar(Number(id), usuario);
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        if (isNaN(Number(id))) {
            return { error: 'ID deve ser um número' };
        }
        return this.usuariosService.remover(Number(id));
    }
}
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefas } from 'src/dtos/create-tarefas/create-tarefas';
import { UpdateTarefas } from 'src/dtos/update-tarefas/update-tarefas';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: CreateTarefas) {
    return this.tarefasService.criar(body);
  }

  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: UpdateTarefas,
  ) {
    return this.tarefasService.atualizarParcial(id, body);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    const idNumero = Number(id);
    return this.tarefasService.remover(idNumero);
  }
}

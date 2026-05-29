import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefasDto } from 'src/tarefas/dtos/CreateTarefasDto';
import { UpdateTarefasDto } from 'src/tarefas/dtos/UpdateTarefasDto';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: CreateTarefasDto) {
    return this.tarefasService.criar(body);
  }

  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: UpdateTarefasDto,
  ) {
    return this.tarefasService.atualizarParcial(id, body);
  }
}

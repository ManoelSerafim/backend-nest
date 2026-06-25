import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Body,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDto } from './dto/CreateEmprestimoDto';
import { UpdateEmprestimoDto } from './dto/UpdateEmprestimoDto';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Get()
  listar(
    @Query('status') status?: string,
    @Query('somenteAtrasados') somenteAtrasados?: boolean,
    @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite?: number,
  ) {
    return this.emprestimosService.listar(status, somenteAtrasados, limite);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimosService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: CreateEmprestimoDto) {
    return this.emprestimosService.criar(body);
  }

  @Patch(':id/devolucao')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: UpdateEmprestimoDto,
  ) {
    return this.emprestimosService.atualizarParcial(id, body);
  }
}

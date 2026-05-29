import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmprestimoDto } from './dtos/CreateEmprestimoDto';
import { UpdateEmprestimoDto } from './dtos/UpdateEmprestimoDto';

type Emprestimo = {
  id: number;
  patrimonio: string;
  solicitante: string;
  turma: string;
  dataEmprestimo: string;
  dataPrevistaDevolucao: string;
  dataDevolucao?: string;
  status: 'ativo' | 'devolvido' | 'atrasado';
};

@Injectable()
export class EmprestimosService {
  private emprestimos: Emprestimo[] = [
    {
      id: 1,
      patrimonio: 'Computador',
      solicitante: 'João',
      turma: '3A',
      dataEmprestimo: '2023-01-01',
      dataPrevistaDevolucao: '2023-01-10',
      dataDevolucao: '2023-01-10',
      status: 'ativo',
    },
    {
      id: 2,
      patrimonio: 'Computador',
      solicitante: 'Manoel',
      turma: '1B',
      dataEmprestimo: '2022-02-02',
      dataPrevistaDevolucao: '2021-01-12',
      dataDevolucao: '2023-01-10',
      status: 'ativo',
    },
        {
      id: 2,
      patrimonio: 'Computador',
      solicitante: 'Jorge',
      turma: '1B',
      dataEmprestimo: '2022-02-02',
      dataPrevistaDevolucao: '2021-01-12',
      dataDevolucao: '2023-01-10',
      status: 'atrasado',
    },
  ];

  listar(status?: string, somenteAtrasados?: boolean, limite?: number) {
    let resultado = [...this.emprestimos];

    if (status) {
      resultado = resultado.filter((t) => t.status === status);
    }

    if (somenteAtrasados) {
      resultado = resultado.filter((t) => t.status == 'atrasado');
    }

    if (limite && limite > 0) {
      resultado = resultado.slice(0, limite);
    }
    return resultado;
  }

  buscarPorId(id: number): Emprestimo {
    const emprestimo = this.emprestimos.find((item) => item.id === id);
    if (!emprestimo) {
          throw new NotFoundException('Tarefa não encontrada');
        }
    return emprestimo;
  }

  criar(dados: CreateEmprestimoDto): Emprestimo {
    const novoId =
      this.emprestimos.length > 0
        ? Math.max(...this.emprestimos.map((item) => item.id)) + 1
        : 1;
    const novoEmprestimo: Emprestimo = { id: novoId, ...dados };
    this.emprestimos.push(novoEmprestimo);

    return novoEmprestimo;
  }

  atualizarParcial(id: number, dados: UpdateEmprestimoDto): Emprestimo {
    const emprestimo = this.buscarPorId(id);
    const emprestimoAtualizado = { ...emprestimo, ...dados };

    if ((emprestimo.status = 'devolvido')) {
      throw new BadRequestException('Produto ja devolvido.');
    }
    if ((emprestimo.status != 'devolvido')) {
      emprestimo.status == 'devolvido';
    }

    this.emprestimos = this.emprestimos.map((item) =>
      item.id === id ? emprestimoAtualizado : item,
    );

    return emprestimoAtualizado;
  }
}

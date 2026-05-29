import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefasDto } from 'src/tarefas/dtos/CreateTarefasDto';
import {
  UpdateTarefasDto,
  StatusTarefa,
} from 'src/tarefas/dtos/UpdateTarefasDto';

type Tarefa = {
  id: number;
  titulo: string;
  descricao?: string;
  status: StatusTarefa;
  prioridade: number;
};

@Injectable()
export class TarefasService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Configurar projeto',
      descricao: 'Instalar dependencias e validar o NestJS',
      status: StatusTarefa.CONCLUIDA,
      prioridade: 1,
    },
    {
      id: 2,
      titulo: 'Criar modulo tarefas',
      descricao: 'Gerar module, controller e service',
      status: StatusTarefa.EM_ANDAMENTO,
      prioridade: 2,
    },
    {
      id: 3,
      titulo: 'Implementar listagem',
      descricao: 'Criar rota GET /tarefas',
      status: StatusTarefa.ABERTA,
      prioridade: 2,
    },
    {
      id: 4,
      titulo: 'Testar no Thunder Client',
      descricao: 'Salvar requests da pratica',
      status: StatusTarefa.ABERTA,
      prioridade: 3,
    },
  ];

  buscarPorId(id: number): Tarefa {
    const tarefa = this.tarefas.find((item) => item.id === id);

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return tarefa;
  }

  criar(dados: CreateTarefasDto): Tarefa {
    const novoId =
      this.tarefas.length > 0
        ? Math.max(...this.tarefas.map((item) => item.id)) + 1
        : 1;

    const novaTarefa: Tarefa = { id: novoId, ...dados };
    this.tarefas.push(novaTarefa);

    return novaTarefa;
  }

  atualizarParcial(id: number, dados: UpdateTarefasDto): Tarefa {
    const tarefa = this.buscarPorId(id);
    const tarefaAtualizada = { ...tarefa, ...dados };

    this.tarefas = this.tarefas.map((item) =>
      item.id === id ? tarefaAtualizada : item,
    );

    return tarefaAtualizada;
  }
}

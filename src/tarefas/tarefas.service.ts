import { Injectable, NotFoundException } from '@nestjs/common';

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string;
  status: 'aberta' | 'em_andamento' | 'concluida';
  prioridade: number;
};

@Injectable()
export class TarefasService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Configurar projeto',
      descricao: 'Instalar dependencias e validar o NestJS',
      status: 'concluida',
      prioridade: 1,
    },
    {
      id: 2,
      titulo: 'Criar modulo tarefas',
      descricao: 'Gerar module, controller e service',
      status: 'em_andamento',
      prioridade: 2,
    },
    {
      id: 3,
      titulo: 'Implementar listagem',
      descricao: 'Criar rota GET /tarefas',
      status: 'aberta',
      prioridade: 2,
    },
    {
      id: 4,
      titulo: 'Testar no Thunder Client',
      descricao: 'Salvar requests da pratica',
      status: 'aberta',
      prioridade: 3,
    },
  ];

  buscarPorId(id: number) {
    const tarefa = this.tarefas.find((item) => item.id === id);

    if (!tarefa) {
      throw new NotFoundException('Tarefa nao encontrada');
    }

    return tarefa;
  }

  criar(dados: Omit<Tarefa, 'id'>) {
    const novoId =
      this.tarefas.length > 0
        ? Math.max(...this.tarefas.map((item) => item.id)) + 1
        : 1;

    const novaTarefa: Tarefa = { id: novoId, ...dados };
    this.tarefas.push(novaTarefa);

    return novaTarefa;
  }

  atualizarParcial(id: number, dados: Partial<Omit<Tarefa, 'id'>>) {
    const tarefa = this.buscarPorId(id);
    const tarefaAtualizada = { ...tarefa, ...dados };

    this.tarefas = this.tarefas.map((item) =>
      item.id === id ? tarefaAtualizada : item,
    );

    return tarefaAtualizada;
  }

  remover(id: number) {
    const tarefa = this.buscarPorId(id);

    this.tarefas = this.tarefas.filter((item) => item.id !== id);

    return {
      mensagem: `Tarefa ${tarefa.id} removida com sucesso`,
    };
  }
}

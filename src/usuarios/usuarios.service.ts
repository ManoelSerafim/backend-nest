import { Injectable, Query } from '@nestjs/common';

type Usuario = {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    idade: string;
}

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [
        {
            id: 1,
            nome: 'João Silva',
            email: 'joao.silva@example.com',
            cpf: '123.456.789-00',
            idade: '10'
        },
        {
            id: 2,
            nome: 'Maria Oliveira',
            email: 'maria.oliveira@example.com',
            cpf: '987.654.321-00',
            idade: '10'
        },
                {
            id: 3,
            nome: 'Maria Oliveira',
            email: 'maria.oliveira@example.com',
            cpf: '987.654.321-00',
            idade: '20'
        }
    ];

    listar(@Query('idade') idade?: string) {
        if (idade !== undefined) {
            return this.usuarios.filter((u) => u.idade === idade);
        }
        return this.usuarios;
    }

    buscarporId(id: number) {
        return this.usuarios.find((u) => u.id === id);
    }

    criar(usuario: Omit<Usuario, 'id'>) {
        const novoid = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
        const novoUsuario = { ...usuario, id: novoid };
        this.usuarios.push(novoUsuario);
        return novoUsuario;
    }

    atualizar(id: number, usuario: Omit<Usuario, 'id'>) {
        const index = this.usuarios.findIndex((u) => u.id === id);
        if (index === -1) {
            return { error: 'Usuário não encontrado' };
        }
        this.usuarios[index] = { ...usuario, id };
        return this.usuarios[index];
    }

    remover(id: number) {
        const index = this.usuarios.findIndex((u) => u.id === id);
        if (index === -1) {
            return { error: 'Usuário não encontrado' };
        }
        this.usuarios.splice(index, 1);
        return { mensagem: `Usuário ${id} removido com sucesso` };
    }
}

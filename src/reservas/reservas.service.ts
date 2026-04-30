import { Injectable, NotFoundException } from '@nestjs/common';

type Reserva = {
    id: number;
    responsavel: string;
    sala: 'azul' | 'verde' | 'vermelha';
    turno: 'manha' | 'tarde' | 'noite';
    integrantes: number;
    status: 'ativa' | 'confirmada' | 'cancelada' | 'encerrada';
}

@Injectable()
export class ReservasService {
    private reservas: Reserva[] = []


    buscarPorId(id: number) {
    const reserva = this.reservas.find((item) => item.id === id);

    if (!reserva) {
        throw new NotFoundException('reserva nao encontrada');
    }
        return reserva;
    }

    criar(dados: Omit<Reserva, 'id'>) {
        const novoId =
            this.reservas.length > 0
                ? Math.max(...this.reservas.map((item) => item.id)) + 1
                : 1;

        const novaReserva: Reserva = { id: novoId, ...dados };
        this.reservas.push(novaReserva);

        return novaReserva;
    }

    atualizarParcial(id: number, dados: Partial<Omit<Reserva, 'id'>>) {
        
        const reserva = this.buscarPorId(id);
        const reservaAtualizada = { ...reserva, ...dados};

        this.reservas = this.reservas.map((item) => item.id === id ? reservaAtualizada : item,);

        return reservaAtualizada;
    }

}

import { Controller, Get, Post, Body, BadRequestException, Patch, Param} from '@nestjs/common';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
    constructor(private readonly reservaService: ReservasService) { }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
        throw new BadRequestException('Parametro "id" deve ser numerico');
    }

    return this.reservaService.buscarPorId(idNumero);
    }
    
    @Post()
    criar(
        @Body()
        body: {
        id: number;
        responsavel: string;
        sala: 'azul' | 'verde' | 'vermelha';
        turno: 'manha' | 'tarde' | 'noite';
        integrantes: number;
        status: 'ativa' | 'confirmada' | 'cancelada' | 'encerrada';
        },
    ){
        if(!body.responsavel || !body.sala || !body.turno || !body.integrantes){
            throw new BadRequestException('Campos obrigatorios: Responsavel, Sala, Turno e Integrantes.');
        }

        if(body.integrantes > 6 || body.integrantes < 1){
            throw new BadRequestException('So é aceito valores entre 1 e 6');
        }

        return this.reservaService.criar(body);
    }
    
    @Patch(':id')
    atualizarParcial(
    @Param('id') id: string,
        @Body()
            body: {
            responsavel?: string;
            sala?: 'azul' | 'verde' | 'vermelha';
            turno?: 'manha' | 'tarde' | 'noite';
            integrantes?: number;
            status?: 'ativa' | 'confirmada' | 'cancelada' | 'encerrada';
        },
    ) {
        const idNumero = Number(id);

        if (Number.isNaN(idNumero)) {
            throw new BadRequestException('Parametro "id" deve ser numerico.');
        }

        if (Object.keys(body).length === 0) {
            throw new BadRequestException('Envie ao menos um campo para atualizacao.');
        }

        if (body.responsavel || body.sala || body.turno){
            throw new BadRequestException('Só é permitido atualizar os campos status e integrantes.')
        }

        return this.reservaService.atualizarParcial(idNumero, body);
    }

}

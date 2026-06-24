import { Injectable } from '@nestjs/common';
import { CreateInscricaoDto } from './dtos/create-inscricao.dto';
import * as Multer from 'multer';

type ArquivoRecebido = {
  nomeOriginal: string;
  tipo: string;
  tamanho: number;
};

type Inscricao = CreateInscricaoDto & {
  id: number;
  criadaEm: string;
  comprovante?: ArquivoRecebido;
};

@Injectable()
export class InscricoesService {
  private inscricoes: Inscricao[] = [];

  criar(dados: CreateInscricaoDto) {
    const novaInscricao: Inscricao = {
      id: this.inscricoes.length + 1,
      ...dados,
      criadaEm: new Date().toISOString(),
    };

    this.inscricoes.push(novaInscricao);
    return novaInscricao;
  }

  criarComArquivo(
    dados: CreateInscricaoDto,
    comprovante: Express.Multer.File,
  ) {
    const novaInscricao: Inscricao = {
      id: this.inscricoes.length + 1,
      ...dados,
      comprovante: {
        nomeOriginal: comprovante.originalname,
        tipo: comprovante.mimetype,
        tamanho: comprovante.size,
      },
      criadaEm: new Date().toISOString(),
    };

    this.inscricoes.push(novaInscricao);
    return novaInscricao;
  }

  listar() {
    return this.inscricoes;
  }
}
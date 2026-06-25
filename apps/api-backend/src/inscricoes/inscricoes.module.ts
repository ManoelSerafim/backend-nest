import { Module } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { InscricoesController } from './inscricoes.controller';

@Module({
  providers: [InscricoesService],
  controllers: [InscricoesController],
})
export class InscricoesModule {}

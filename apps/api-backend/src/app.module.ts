import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { EmprestimosController } from './emprestimos/emprestimos.controller';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { InscricoesModule } from './inscricoes/inscricoes.module';
import { EstadoModule } from './estado/estado.module';

@Module({
  imports: [TarefasModule, EmprestimosModule, InscricoesModule, EstadoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { TesteController } from './teste/teste.controller';

@Module({
  imports: [TarefasModule],
  controllers: [AppController, TesteController],
  providers: [AppService],
})
export class AppModule {}

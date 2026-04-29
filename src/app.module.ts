import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [TarefasModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

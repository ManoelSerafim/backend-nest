import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [TarefasModule, UsuariosModule, ReservasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

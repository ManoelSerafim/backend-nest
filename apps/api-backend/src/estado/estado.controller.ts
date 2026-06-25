import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { SessionData } from 'express-session';
import { IdentificarUsuarioDto } from './dto/identificar-usuario.dto';
import { SalvarPreferenciasDto } from './dto/salvar-preferencias.dto';

const UMA_SEMANA = 1000 * 60 * 60 * 24 * 7;

@Controller('estado')
export class EstadoController {
  @Post('preferencias')
  salvarPreferencias(
    @Body() body: SalvarPreferenciasDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.cookie('tema', body.tema, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: UMA_SEMANA,
      path: '/',
    });

    return {
      mensagem: 'Preferências salvas',
      tema: body.tema,
    };
  }

  @Get('preferencias')
  lerPreferencias(@Req() request: Request) {
    return {
      tema: request.cookies?.tema ?? 'sistema',
    };
  }

  @Post('identificacao')
  identificar(
    @Body() body: IdentificarUsuarioDto,
    @Session() session: SessionData,
  ) {
    session.usuario = {
      nome: body.nome,
      ...(body.email && { email: body.email }),
    };

    session.iniciadaEm ??= new Date().toISOString();

    return {
      mensagem: 'Sessão atualizada',
      usuario: session.usuario,
      iniciadaEm: session.iniciadaEm,
    };
  }

  @Get('sessao')
  verSessao(@Req() request: Request, @Session() session: SessionData) {
    session.visitas = (session.visitas ?? 0) + 1;
    session.iniciadaEm ??= new Date().toISOString();

    return {
      sessionId: request.sessionID,
      visitas: session.visitas,
      iniciadaEm: session.iniciadaEm,
      usuario: session.usuario ?? null,
      tema: request.cookies?.tema ?? null,
    };
  }

  @Post('sair')
  sair(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return new Promise<{ mensagem: string }>((resolve, reject) => {
      request.session.destroy((erro) => {
        if (erro) {
          reject(
            new InternalServerErrorException(
              'Não foi possível encerrar a sessão',
            ),
          );
          return;
        }

        response.clearCookie('sid', { path: '/' });
        response.clearCookie('tema', { path: '/' });

        resolve({
          mensagem: 'Sessão encerrada',
        });
      });
    });
  }
}
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RawgService } from './rawg.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('rawg')
@ApiBearerAuth()
@Controller('rawg')
export class RawgController {
  constructor(private readonly rawgService: RawgService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os jogos na página 1 (default)' })
  @ApiResponse({ status: 200, description: 'Jogos listados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar jogos' })
  async getGamesDefault(): Promise<any> {
    return this.rawgService.getGames(1);
  }

  @Get(':page')
  @ApiOperation({ summary: 'Listar todos os jogos por página' })
  @ApiResponse({ status: 200, description: 'Jogos listados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar jogos' })
  async getGames(@Param('page', ParseIntPipe) page: number): Promise<any> {
    return this.rawgService.getGames(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Informação de um jogo pelo ID' })
  @ApiResponse({ status: 200, description: 'Jogo listado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar jogo' })
  async getGameById(@Param('id') id: string): Promise<any> {
    return this.rawgService.getGameById(id);
  }
}

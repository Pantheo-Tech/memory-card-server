import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameDto } from 'src/DTO/get.game.dto';
import { RegisterGameDto } from 'src/DTO/register.game.dto';
import { UpdateGameDto } from 'src/DTO/update.game.dto';
import { GameService } from 'src/service/game/game.service';

@ApiTags('game')
@ApiBearerAuth()
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo jogo' })
  @ApiResponse({ status: 201, description: 'Jogo cadastrado com sucesso' })
  async createGame(@Body() registerGameDto: RegisterGameDto): Promise<GameDto> {
    return this.gameService.createGame(registerGameDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar jogo por ID' })
  @ApiResponse({ status: 200, description: 'Jogo encontrado' })
  @ApiResponse({ status: 404, description: 'Jogo não encontrado' })
  async getById(@Param('id') gameId: string): Promise<GameDto> {
    const id = +gameId;
    return this.gameService.findGameById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os jogos' })
  @ApiResponse({ status: 200, description: 'Jogos encontrados' })
  async getAll(): Promise<Array<GameDto>> {
    return this.gameService.findAllGames();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um jogo' })
  @ApiResponse({ status: 200, description: 'Jogo atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Jogo não encontrado' })
  async updateGame(
    @Param('id') gameId: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<GameDto> {
    const id = +gameId;
    return this.gameService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um jogo' })
  @ApiResponse({ status: 200, description: 'Jogo deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Jogo não encontrado' })
  async deleteGame(@Param('id') gameId: string): Promise<{ message: string }> {
    const id = +gameId;
    return this.gameService.deleteGame(id);
  }
}

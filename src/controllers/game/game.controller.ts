import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameDto } from 'src/DTO/game.dto';
import { RegisterGameDto } from 'src/DTO/register.game.dto';
import { GameService } from 'src/service/game/game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() registerGameDto: RegisterGameDto): Promise<GameDto> {
    return this.gameService.createGame(registerGameDto);
  }

  @Get(':id')
  async getById(@Param('id') gameId: string): Promise<GameDto> {
    const id = +gameId;
    return this.gameService.findGameById(id);
  }

  @Get()
  async getAll(): Promise<Array<GameDto>> {
    return this.gameService.findAllGames();
  }
}

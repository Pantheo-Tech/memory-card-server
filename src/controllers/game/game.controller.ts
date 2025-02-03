import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GameDto } from 'src/DTO/get.game.dto';
import { RegisterGameDto } from 'src/DTO/register.game.dto';
import { UpdateGameDto } from 'src/DTO/update.game.dto';
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

  @Put(':id')
  async updateGame(
    @Param('id') gameId: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<GameDto> {
    const id = +gameId;
    return this.gameService.updateGame(id, updateGameDto);
  }
}

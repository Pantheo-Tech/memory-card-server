import { Body, Controller, Post } from '@nestjs/common';
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
}

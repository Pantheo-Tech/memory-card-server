import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GameRawgBasicDto } from 'src/DTO/raw.dto';

@Injectable()
export class RawgService {
  constructor() {}

  private logger = new Logger(RawgService.name);
  private url = process.env.RAWG_API_URL;
  private key = process.env.RAWG_API_KEY;

  async getGames(page: number): Promise<any> {
    const games: GameRawgBasicDto[] = [];
    const {
      data: { count, results },
    } = await axios.get(`${this.url}/games?key=${this.key}&page=${page}`);
    const numberPages = Math.ceil(count / 40);
    for (const game of results) {
      games.push({
        id: game.id,
        name: game.name,
        slug: game.slug,
        background_image: game.background_image,
      });
    }
    return page > 1 ? { games } : { numberPages, games };
  }

  async getGameById(id: string): Promise<any> {
    const { data } = await axios.get(`${this.url}/games/${id}?key=${this.key}`);
    return data;
  }
}

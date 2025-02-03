import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterGameDto } from 'src/DTO/register.game.dto';
import { GameDto } from 'src/DTO/get.game.dto';
import { UpdateGameDto } from 'src/DTO/update.game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async createGame(dto: RegisterGameDto): Promise<GameDto> {
    const { user_id, ...rest } = dto;

    const userById = await this.prisma.tb_user.findUnique({
      where: { id: user_id },
    });

    if (!userById) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const game = await this.prisma.tb_played_games.create({
      data: {
        user_id: userById.id,
        ...rest,
      },
    });

    return {
      id: game.id,
      platinum: game.platinum,
      achievements: game.achievements,
      status: game.status,
      game_id: game.game_id,
      user_id: game.user_id,
      created_at: game.created_at,
      updated_at: game.updated_at,
      deleted_at: game.deleted_at,
    };
  }

  async findGameById(gameId: number): Promise<GameDto> {
    const game = await this.prisma.tb_played_games.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new NotFoundException(`Game com ID ${gameId} não encontrado`);
    }

    return game;
  }

  async findAllGames(): Promise<Array<GameDto>> {
    const games = await this.prisma.tb_played_games.findMany();

    if (!games) {
      throw new NotFoundException('Nenhum jogo encontrado');
    }

    return games.map((game) => ({
      id: game.id,
      platinum: game.platinum,
      achievements: game.achievements,
      status: game.status,
      game_id: game.game_id,
      user_id: game.user_id,
      created_at: game.created_at,
      updated_at: game.updated_at,
      deleted_at: game.deleted_at,
    }));
  }

  async updateGame(id: number, dto: UpdateGameDto): Promise<GameDto> {
    const { user_id } = dto;

    const user = await this.prisma.tb_user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${user_id} não encontrado`);
    }

    const existingGame = await this.prisma.tb_played_games.findUnique({
      where: { id: id },
    });

    if (!existingGame) {
      throw new NotFoundException(`Jogo com ID ${id} não encontrado`);
    }

    const game = await this.prisma.tb_played_games.update({
      where: { id: id },
      data: dto,
    });

    return game;
  }
}

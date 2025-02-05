/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterGameDto } from 'src/DTO/register.game.dto';
import { GameDto } from 'src/DTO/get.game.dto';
import { type_game_status } from '@prisma/client';

describe('GameService', () => {
  let gameService: GameService;
  let mockPrismaService: Partial<PrismaService>;

  beforeEach(async () => {
    mockPrismaService = {
      tb_played_games: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as any,
      tb_user: {
        findUnique: jest.fn(),
      } as any,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createGame', () => {
    it('should create a game successfully', async () => {
      const registerGameDto: RegisterGameDto = {
        user_id: 1,
        platinum: true,
        achievements: 'blabla',
        status: 'played' as type_game_status,
        game_id: 123,
      };

      const user = { id: 1 };
      const game = {
        id: 1,
        ...registerGameDto,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      (mockPrismaService.tb_user!.findUnique as jest.Mock).mockResolvedValue(
        user,
      );
      (
        mockPrismaService.tb_played_games!.create as jest.Mock
      ).mockResolvedValue(game);

      const result: GameDto = await gameService.createGame(registerGameDto);

      expect(result).toEqual({
        id: game.id,
        platinum: game.platinum,
        achievements: game.achievements,
        status: game.status,
        game_id: game.game_id,
        user_id: game.user_id,
        created_at: game.created_at,
        updated_at: game.updated_at,
        deleted_at: game.deleted_at,
      });
    });
  });

  describe('findGameById', () => {
    it('should return a game by ID', async () => {
      const gameId = 1;
      const game = {
        id: gameId,
        platinum: true,
        achievements: 10,
        status: 'Completed',
        game_id: 123,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      (
        mockPrismaService.tb_played_games!.findUnique as jest.Mock
      ).mockResolvedValue(game);

      const result: GameDto = await gameService.findGameById(gameId);

      expect(result).toEqual(game);
    });
  });

  describe('findAllGames', () => {
    it('should return an array of games', async () => {
      const games = [
        {
          id: 1,
          platinum: true,
          achievements: 10,
          status: 'Completed',
          game_id: 123,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
      ];

      (
        mockPrismaService.tb_played_games!.findMany as jest.Mock
      ).mockResolvedValue(games);

      const result: GameDto[] = await gameService.findAllGames();

      expect(result).toEqual(games);
    });
  });

  describe('updateGame', () => {
    it('should update a game successfully', async () => {
      const gameId = 1;
      const updateGameDto = {
        id: gameId,
        user_id: 1,
        platinum: false,
        achievements: '20',
        status: 'played' as type_game_status,
        game_id: 123,
        deleted_at: null,
      };

      const user = { id: 1 };
      const existingGame = {
        id: gameId,
        platinum: true,
        achievements: '10',
        status: 'playing',
        game_id: 123,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      const updatedGame = {
        ...existingGame,
        ...updateGameDto,
      };

      (mockPrismaService.tb_user!.findUnique as jest.Mock).mockResolvedValue(
        user,
      );
      (
        mockPrismaService.tb_played_games!.findUnique as jest.Mock
      ).mockResolvedValue(existingGame);
      (
        mockPrismaService.tb_played_games!.update as jest.Mock
      ).mockResolvedValue(updatedGame);

      const result: GameDto = await gameService.updateGame(
        gameId,
        updateGameDto,
      );

      expect(result).toEqual(updatedGame);
    });
  });

  describe('deleteGame', () => {
    it('should delete a game successfully', async () => {
      const gameId = 1;
      const game = {
        id: gameId,
        platinum: true,
        achievements: 10,
        status: 'Completed',
        game_id: 123,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      (
        mockPrismaService.tb_played_games!.findUnique as jest.Mock
      ).mockResolvedValue(game);
      (
        mockPrismaService.tb_played_games!.delete as jest.Mock
      ).mockResolvedValue(game);

      const result = await gameService.deleteGame(gameId);

      expect(result).toEqual({
        message: `Jogo com ID ${gameId} deletado com sucesso`,
      });
    });
  });
});

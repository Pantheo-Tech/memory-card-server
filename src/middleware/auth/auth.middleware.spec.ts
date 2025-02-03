import { AuthMiddleware } from './auth.middleware';
import { PrismaService } from '../../service/prisma/prisma.service';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let mockPrisma: Partial<PrismaService>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    (jwt.verify as jest.Mock).mockImplementation((token) => {
      if (token === 'validToken') {
        return { id: 1 };
      }
      throw new Error('Token inválido');
    });

    mockPrisma = {
      tb_user: {
        findUnique: jest.fn(),
      } as any,
    };

    middleware = new AuthMiddleware(mockPrisma as PrismaService);

    mockReq = {
      headers: {
        authorization: 'Bearer validToken',
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks para evitar interferência entre testes
  });

  it('deve chamar next() se o token for válido e o usuário existir', async () => {
    (mockPrisma.tb_user!.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Test User',
    });

    await middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('deve retornar 401 se o token estiver ausente', async () => {
    mockReq.headers = {};

    await middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Token ausente',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar 401 se o token for inválido', async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Token inválido');
    });

    await middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Erro na autenticação',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar 401 se o usuário não for encontrado', async () => {
    (mockPrisma.tb_user!.findUnique as jest.Mock).mockResolvedValue(null);

    await middleware.use(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      auth: false,
      message: 'Usuário não encontrado',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});

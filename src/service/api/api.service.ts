import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly BASE_URL = process.env.RAWG_API_URL;
  private readonly API_KEY = process.env.RAWG_API_KEY;
  private readonly SERVER_URL = process.env.SERVER_URL;
  private readonly logger = new Logger(ApiService.name);
  private pingIntervalId: NodeJS.Timeout | null = null;

  constructor(
    private httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  private startPingService() {
    if (this.pingIntervalId) return;

    this.logger.log('🏓 Iniciando serviço de ping...');
    this.pingIntervalId = setInterval(async () => {
      try {
        this.logger.log('🏓 Enviando ping para o servidor...');
        await lastValueFrom(this.httpService.get(`${this.SERVER_URL}/`));
        this.logger.log('✅ Ping enviado com sucesso!');
      } catch (error) {
        this.logger.error('❌ Falha ao enviar ping:', error.message);
      }
    }, 60000);
  }

  private stopPingService() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
      this.logger.log('🚫 Ping interrompido após sincronização.');
    }
  }

  async syncDatabase(): Promise<void> {
    this.logger.log('🕗 Iniciando sincronização com a RAWG API...');

    this.startPingService();

    await this.syncTable('tb_genres', 'genres');
    await this.syncTable('tb_stores', 'stores');
    await this.syncTable('tb_platforms', 'platforms');

    this.logger.log('✅ Sincronização finalizada!');
    this.stopPingService();
    await this.prisma.$disconnect();
  }

  private async syncTable<T extends keyof typeof this.prisma>(
    table: T,
    endpoint: string,
  ) {
    const stringTable = String(table);

    try {
      this.logger.log(`🔍 Iniciando sincronização: ${stringTable}...`);
      const existingRecords = await (this.prisma[table] as any).findMany();
      const apiData = await this.fetchData(endpoint);
      const existingMap = new Map(
        existingRecords.map((item: any) => [item.id, item]),
      );

      let toInsert: any[] = [];
      let toUpdate: any[] = [];

      for (const item of apiData) {
        const formattedItem = {
          id: Number(item.id),
          name: item.name,
          slug: item.slug,
          game_count: Number(item.games_count),
          img: item.image_background,
        };

        const existing: any = existingMap.get(formattedItem.id);

        if (!existing) {
          toInsert.push(formattedItem);
        } else if (
          existing.name !== formattedItem.name ||
          existing.slug !== formattedItem.slug ||
          existing.game_count !== formattedItem.game_count
        ) {
          toUpdate.push(formattedItem);
        }
      }

      // 🚀 Ordena os IDs antes de inserir
      toInsert = toInsert.sort((a, b) => a.id - b.id);

      await this.batchInsert(table, toInsert);
      await this.batchUpdate(table, toUpdate);
    } catch (error) {
      this.logger.error(
        `❌ Erro ao sincronizar ${stringTable}: ${error.message}`,
      );
      throw new HttpException(
        `Erro ao sincronizar ${stringTable}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async batchInsert<T extends keyof typeof this.prisma>(
    table: T,
    items: any[],
  ) {
    if (items.length === 0) return;

    const batchSize = 5;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map((item) => (this.prisma[table] as any).create({ data: item })),
      );
    }
    this.logger.log(`➕ ${items.length} novos registros adicionados.`);
  }

  private async batchUpdate<T extends keyof typeof this.prisma>(
    table: T,
    items: any[],
  ) {
    if (items.length === 0) return;

    const batchSize = 5;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map((item) =>
          (this.prisma[table] as any).update({
            where: { id: item.id },
            data: item,
          }),
        ),
      );
    }
    this.logger.log(`🔄 ${items.length} registros atualizados.`);
  }

  private async fetchData(endpoint: string): Promise<any[]> {
    try {
      let allResults: any[] = [];
      let url = `${this.BASE_URL}/${endpoint}?key=${this.API_KEY}&page_size=40`;

      while (url) {
        const response = await lastValueFrom(this.httpService.get(url));
        const data = response.data;
        allResults = allResults.concat(data.results);
        url = data.next;
      }
      const results = allResults.sort((a, b) => a.id - b.id);
      this.logger.log(`✅ ${endpoint} - ${allResults.length} itens coletados`);
      return results;
    } catch (error) {
      this.logger.error(`❌ Erro ao buscar ${endpoint}: ${error.message}`);
      throw new HttpException(
        `Erro ao buscar ${endpoint}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

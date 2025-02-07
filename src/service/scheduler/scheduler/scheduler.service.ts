import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiService } from 'src/service/api/api.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly apiService: ApiService) {}

  @Cron('0 8 * * *', { timeZone: 'America/Sao_Paulo' })
  async handleCron() {
    this.logger.debug('Sincronizando banco de dados com a RAWG API...');
    await this.apiService.syncDatabase();
  }
}

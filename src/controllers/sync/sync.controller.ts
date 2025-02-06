import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public/public.decorator';
import { ApiService } from 'src/service/api/api.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly apiService: ApiService) {}

  @Public()
  @Get('sync')
  async syncDatabase() {
    return await this.apiService.syncDatabase();
  }
}

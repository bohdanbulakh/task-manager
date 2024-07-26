import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MainConfigService {
  constructor (private configService: ConfigService) {}

  get secret () {
    return this.configService.get<string>('secret');
  }

  get sessionsAmount () {
    return +this.configService.get<number>('sessions');
  }

  get accessTtl (): string {
    return this.configService.get<string>('accessTtl');
  }

  get refreshTtl (): string {
    return this.configService.get<string>('refreshTtl');
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.get<string>('DATABASE_URL'),
      
    });
    super({
      adapter,
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
    });
  }

  onModuleInit(): void {
    this.$on('query' as never, (e: any) => {
      console.log('Query:', (e as Record<string, any>).query);
      console.log('Params:', (e as Record<string, any>).params);
      console.log('Duration:', (e as Record<string, any>).duration + 'ms');
    });
  }
}

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // بيخلي الموديول متاح في التطبيق كله بدون إعادة استيراده
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // مهم جداً عشان الـ DI يشوفه برا الموديول ده
})
export class PrismaModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EncontroController } from './encontro.controller';

@Module({
  controllers: [EncontroController],
  providers: [PrismaService],
})
export class EncontroModule {}

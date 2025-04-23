import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotaController } from './nota.controller';

@Module({
  controllers: [NotaController],
  providers: [PrismaService],
})
export class NotaModule {}

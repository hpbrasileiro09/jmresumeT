import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FichaController } from './ficha.controller';

@Module({
  controllers: [FichaController],
  providers: [PrismaService],
})
export class FichaModule {}

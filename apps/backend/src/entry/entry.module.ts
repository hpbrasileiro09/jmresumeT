import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EntryController } from './entry.controller';

@Module({
  controllers: [EntryController],
  providers: [PrismaService],
})
export class EntryModule {}

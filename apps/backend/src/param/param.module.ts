import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ParamController } from './param.controller';

@Module({
  controllers: [ParamController],
  providers: [PrismaService],
})
export class ParamModule {}

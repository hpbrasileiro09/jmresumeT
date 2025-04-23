import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Controller('notas')
export class NotaController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  create(@Body() nota: any) {
    return this.prisma.create('nota', nota);
  }

  @Get()
  findMany(): any {
    return this.prisma.findMany('nota');
  }

  @Get('/related')
  findManyRelated(): any {
    return this.prisma.findManyRelated('nota', {
      //relationLoadStrategy: 'join', // or 'query'
      include: {
        ficha: true,
      },
    });
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prisma.findOne('nota', +id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.prisma.delete('nota', +id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() nota: any) {
    return this.prisma.update('nota', +id, nota);
  }
}

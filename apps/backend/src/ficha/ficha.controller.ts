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

@Controller('fichas')
export class FichaController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  create(@Body() ficha: any) {
    return this.prisma.create('ficha', ficha);
  }

  @Get()
  findMany(): any {
    return this.prisma.findMany('ficha');
  }

  @Get('/related')
  findManyRelated(): any {
    return this.prisma.findManyRelated('ficha', {
      //relationLoadStrategy: 'join', // or 'query'
      include: {
        encontros: true,
        notas: true,
      },
    });
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prisma.findOne('ficha', +id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.prisma.delete('ficha', +id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() ficha: any) {
    return this.prisma.update('ficha', +id, ficha);
  }
}

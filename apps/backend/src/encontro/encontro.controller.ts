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

@Controller('encontros')
export class EncontroController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  create(@Body() encontro: any) {
    return this.prisma.create('encontro', encontro);
  }

  @Get()
  findMany(): any {
    return this.prisma.findMany('encontro');
  }

  @Get('/related')
  findManyRelated(): any {
    return this.prisma.findManyRelated('encontro', {
      //relationLoadStrategy: 'join', // or 'query'
      include: {
        ficha: true,
      },
    });
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prisma.findOne('encontro', +id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.prisma.delete('encontro', +id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() encontro: any) {
    return this.prisma.update('encontro', +id, encontro);
  }
}

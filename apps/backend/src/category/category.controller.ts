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

@Controller('categories')
export class CategoryController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  create(@Body() category: any) {
    return this.prisma.create('category', category);
  }

  @Get()
  findMany(): any {
    return this.prisma.findMany('category');
  }

  @Get('/related')
  findManyRelated(): any {
    return this.prisma.findManyRelated('category', {
      //relationLoadStrategy: 'join', // or 'query'
      include: {
        entries: true,
      },
    });
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prisma.findOne('category', +id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.prisma.delete('category', +id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() category: any) {
    return this.prisma.update('category', +id, category);
  }
}

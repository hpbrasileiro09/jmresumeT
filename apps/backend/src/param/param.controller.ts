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

@Controller('params')
export class ParamController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  create(@Body() param: any) {
    return this.prisma.create('param', param);
  }

  @Get()
  findMany(): any {
    return this.prisma.findMany('param');
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prisma.findOne('param', +id);
  }

  @Get('/label/:label')
  finFirst(@Param('label') label: string) {
    return this.prisma.findFirst('param', label);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.prisma.delete('param', +id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() param: any) {
    return this.prisma.update('param', +id, param);
  }
}

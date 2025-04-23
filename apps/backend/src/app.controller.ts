/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('/users')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/hello')
  getHello(): string {
    return this.prisma.getHello();
  }

  @Post()
  createUser(@Body() user: any) {
    return this.prisma.create('user', user);
  }

  @Get()
  findMany(): any {
    return this.prisma.findMany('user');
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prisma.findOne('user', +id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.prisma.delete('user', +id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.prisma.update('user', +id, user);
  }

}

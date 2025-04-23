import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  getHello(): string {
    return 'Prismatico!';
  }
  create<T>(model: string, data: T) {
    return this[model].create({ data });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findMany<T>(model: string) {
    return this[model].findMany();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findManyRelated<T>(model: string, params: any) {
    return this[model].findMany(params);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne<T>(model: string, id: number) {
    return this[model].findFirst({ where: { id: id } });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findFirst<T>(model: string, label: string) {
    return this[model].findFirst({ where: { label: label } });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete<T>(model: string, id: number) {
    return this[model].delete({ where: { id: id } });
  }
  update<T>(model: string, id: number, data: T) {
    return this[model].update({ where: { id: id }, data });
  }
}

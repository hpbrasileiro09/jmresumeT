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

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

@Controller('entries')
export class EntryController {
  constructor(private readonly prisma: PrismaService) {}
  @Post()
  create(@Body() entry: any) {
    return this.prisma.create('entry', entry);
  }

  @Get()
  findMany(): any {
    return this.prisma.findMany('entry');
  }

  @Get('/related')
  findManyRelated(): any {
    return this.prisma.findManyRelated('entry', {
      //relationLoadStrategy: 'join', // or 'query'
      include: {
        category: true,
      },
    });
  }

  @Get('/related/credit/:ano')
  findManyRelatedCredit(@Param('ano') ano: string): any {
    const iano = (parseInt(ano) + 1).toString();
    const dt_ini = ano + '-01-01T23:59:59.000Z';
    const dt_fim = iano + '-01-01T00:00:00.000Z';
    return this.prisma.findManyRelated('entry', {
      //relationLoadStrategy: 'join', // or 'query'
      include: {
        category: true,
      },
      orderBy: {
        dt_entry: 'asc',
      },
      where: {
        status: {
          equals: 1,
        },
        published: {
          equals: 1,
        },
        dt_entry: {
          gte: dt_ini,
          lte: dt_fim,
        },
        vl_entry: {
          gte: 0.0,
        },
      },
    });
  }

  @Get('/related/debit/:ano')
  findManyRelatedDebit(@Param('ano') ano: string): any {
    const iano = (parseInt(ano) + 1).toString();
    const dt_ini = ano + '-01-01T23:59:59.000Z';
    const dt_fim = iano + '-01-01T00:00:00.000Z';
    return this.prisma.findManyRelated('entry', {
      //relationLoadStrategy: 'join', // or 'query'
      include: {
        category: true,
      },
      orderBy: {
        dt_entry: 'asc',
      },
      where: {
        status: {
          equals: 1,
        },
        published: {
          equals: 1,
        },
        dt_entry: {
          gte: dt_ini,
          lte: dt_fim,
        },
        vl_entry: {
          lt: 0.0,
        },
      },
    });
  }

  @Get('/byparam/:dt_entry')
  findManyByParam(@Param('dt_entry') dt_entry: string): any {
    return this.prisma.findManyRelated('entry', {
      include: {
        category: true,
      },
      orderBy: {
        dt_entry: 'asc',
      },
      where: {
        dt_entry: {
          gte: dt_entry + 'T23:59:59.000Z',
        },
      },
    });
  }

  @Get('/search/:search/dt_search/:dt_search')
  findManySearch(
    @Param('search') search: string,
    @Param('dt_search') dt_search: string,
  ): any {
    const dt_ini = dt_search;
    const dt_fim = dt_search.substring(0, 10) + 'T23:59:59.000Z';
    if (search.length > 0 && search != 'nothing') {
      return this.prisma.findManyRelated('entry', {
        include: {
          category: true,
        },
        orderBy: [{ dt_entry: 'asc' }, { vl_entry: 'desc' }],
        where: {
          OR: [
            { ds_category: { contains: search } },
            { ds_subcategory: { contains: search } },
            {
              category: {
                name: {
                  contains: search,
                },
              },
            },
          ],
        },
      });
    } else {
      return this.prisma.findManyRelated('entry', {
        include: {
          category: true,
        },
        orderBy: [{ dt_entry: 'asc' }, { vl_entry: 'desc' }],
        where: {
          dt_entry: {
            gte: dt_ini,
            lte: dt_fim,
          },
        },
      });
    }
  }

  @Get('/sumvlentry/:dt_entry')
  findManySumVlEntry(@Param('dt_entry') dt_entry: string): any {
    return this.prisma.entry.aggregate({
      where: {
        status: {
          equals: 1,
        },
        dt_entry: {
          lte: dt_entry + 'T23:59:59.000Z',
        },
      },
      _sum: {
        vl_entry: true,
      },
    });
  }

  @Get('/sum/:ano')
  findManySum(@Param('ano') ano: string): any {
    const dt_ini = '2009-12-20T00:00:00.000Z';
    const dt_fim = ano + '-01-01T00:00:00.000Z';
    return this.prisma.entry.aggregate({
      where: {
        status: {
          equals: 1,
        },
        dt_entry: {
          gte: dt_ini,
          lte: dt_fim,
        },
      },
      _sum: {
        vl_entry: true,
      },
    });
  }

  @Get('/grafico/de/:dt_ini/ate/:dt_fim')
  findManyGrafico1(
    @Param('dt_ini') dt_ini: string,
    @Param('dt_fim') dt_fim: string,
  ): any {
    return this.prisma.$queryRaw`
    SELECT MONTH(dt_entry) as Mes, SUM(vl_entry) as Total 
    FROM entries 
    WHERE status = 1 AND dt_entry >= ${dt_ini.toString()} AND dt_entry < ${dt_fim.toString()} 
    GROUP BY MONTH(dt_entry)
    ORDER BY MONTH(dt_entry);`;
  }

  @Get('/grafico/:ano')
  findManyGrafico2(@Param('ano') ano: string): any {
    return this.prisma.$queryRaw`
      SELECT 
      'Janeiro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 1) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 1) AS credit
      UNION
      SELECT 
      'Fevereiro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 2) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 2) AS credit
      UNION
      SELECT 
      'Março' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 3) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 3) AS credit
      UNION
      SELECT 
      'Abril' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 4) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 4) AS credit
      UNION
      SELECT 
      'Maio' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 5) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 5) AS credit
      UNION
      SELECT 
      'Junho' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 6) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 6) AS credit
      UNION
      SELECT 
      'Julho' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 7) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 7) AS credit
      UNION
      SELECT 
      'Agosto' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 8) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 8) AS credit
      UNION
      SELECT 
      'Setembro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 9) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 9) AS credit
      UNION
      SELECT 
      'Outubro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 10) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 10) AS credit
      UNION
      SELECT 
      'Novembro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 11) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 11) AS credit
      UNION
      SELECT 
      'Dezembro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE status = 1 AND vl_entry <= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 12) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE status = 1 AND vl_entry > 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 12) AS credit;`;
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.prisma.findOne('entry', +id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.prisma.delete('entry', +id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() entry: any) {
    return this.prisma.update('entry', +id, entry);
  }
}

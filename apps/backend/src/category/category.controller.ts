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

// import { Prisma } from '@prisma/client';

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

  @Get('/related/credit/naofoi/:ano')
  findManyRelatedCreditNF(@Param('ano') ano: string): any {
    const meses = [
      { month: 'Janeiro', id: 1 },
      { month: 'Fevereiro', id: 2 },
      { month: 'Março', id: 3 },
      /*
      { month: 'Abril', id: 4 },
      { month: 'Mail', id: 5 },
      { month: 'Junho', id: 6 },
      { month: 'Julho', id: 7 },
      { month: 'Agosto', id: 8 },
      { month: 'Setembro', id: 9 },
      { month: 'Outubro', id: 10 },
      { month: 'Novembro', id: 11 },
      { month: 'Dezembro', id: 12 },
      */
    ];

    const categorias = '( 81, 82, 87, 116, 120, 126, 127, 128 )';

    const union_all = `UNION `;

    const sql_base = `SELECT MES AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = MES AND X.category_id IN ${categorias} AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0 GROUP BY X.category_id, Y.name, Y.ordem `;

    let icont = 0;
    const sql = meses.map((mes: any) => {
      let retorno = '';
      if (icont == 0) {
        icont++;
      } else {
        retorno += union_all;
      }
      retorno += sql_base.replaceAll('MES', mes.id);
      return retorno;
    });

    const xsql = sql.join(''); //.toString();

    console.log(xsql);

    const xsql_base =
      'SELECT 1 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id WHERE YEAR(X.dt_entry) = 2025 AND MONTH(X.dt_entry) = 1 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0 GROUP BY X.category_id, Y.name, Y.ordem';

    //return this.prisma.$queryRaw(Prisma.sql`${xsql_base}`);

    //return this.prisma.$queryRaw(Prisma.sql`${xsql}`);

    return this.prisma.$queryRaw`
        ${xsql_base}`;

    //return this.prisma.$queryRaw`${xsql}`;
  }

  @Get('/related/credit/z/:ano')
  findManyRelatedCreditx(@Param('ano') ano: string): any {
    return this.prisma.$queryRaw`
      SELECT month, category_id, category_label, ordem, calc FROM (
      SELECT 1 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 1 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 2 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 2 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 3 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 3 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 4 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 4 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 5 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 5 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 6 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 6 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 7 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 7 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 8 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 8 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 9 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 9 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 10 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 10 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 11 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 11 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      UNION ALL
      SELECT 12 AS month, X.category_id, Y.name AS category_label, Y.ordem, SUM(X.vl_entry) AS calc
      FROM entries AS X LEFT JOIN categories AS Y ON Y.id = X.category_id
      WHERE YEAR(X.dt_entry) = ${ano} AND MONTH(X.dt_entry) = 12 AND X.category_id IN ( 81, 82, 87, 116, 120, 126, 127, 128 ) AND X.status = 1 AND X.published = 1 AND X.vl_entry >= 0.0
      GROUP BY X.category_id, Y.name, Y.ordem
      ) AS Temp
      ORDER BY Temp.ordem, Temp.month, Temp.category_id, Temp.category_label`;
  }

  @Get('/related/credit/:ano')
  findManyRelatedCredit(@Param('ano') ano: string): any {
    const dt_ini = ano + '-01-01T00:00:00.000Z';
    const dt_fim = ano + '-12-31T23:59:59.000Z';
    const categories = [
      { category_id: 81 },
      { category_id: 82 },
      { category_id: 87 },
      { category_id: 116 },
      { category_id: 120 },
      { category_id: 126 },
      { category_id: 127 },
      { category_id: 128 },
    ];
    return this.prisma.findManyRelated('category', {
      include: {
        entries: true,
      },
      orderBy: {
        ordem: 'desc',
      },
      where: {
        id: {
          in: categories.map((cat) => cat.category_id),
        },
        entries: {
          some: {
            status: {
              equals: 1,
            },
            published: {
              equals: 1,
            },
            vl_entry: {
              gte: 0.0,
            },
            dt_entry: {
              gte: dt_ini,
              lte: dt_fim,
            },
          },
        },
      },
    });
  }

  @Get('/related/debit/:ano')
  findManyRelatedDebit(@Param('ano') ano: string): any {
    const dt_ini = ano + '-01-01T00:00:00.000Z';
    const dt_fim = ano + '-12-31T23:59:59.000Z';
    return this.prisma.findManyRelated('category', {
      include: {
        entries: true,
      },
      orderBy: {
        ordem: 'desc',
      },
      where: {
        entries: {
          some: {
            status: {
              equals: 1,
            },
            published: {
              equals: 1,
            },
            vl_entry: {
              lt: 0.0,
            },
            dt_entry: {
              gte: dt_ini,
              lte: dt_fim,
            },
          },
        },
      },
    });
  }

  @Get('/temp/:ano')
  findManyTemp(@Param('ano') ano: string): any {
    return this.prisma.$queryRaw`
      SELECT 
      'Janeiro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 1) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 1) AS credit
      UNION
      SELECT 
      'Fevereiro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 2) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 2) AS credit
      UNION
      SELECT 
      'Março' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 3) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 3) AS credit
      UNION
      SELECT 
      'Abril' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 4) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 4) AS credit
      UNION
      SELECT 
      'Maio' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 5) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 5) AS credit
      UNION
      SELECT 
      'Junho' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 6) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 6) AS credit
      UNION
      SELECT 
      'Julho' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 7) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 7) AS credit
      UNION
      SELECT 
      'Agosto' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 8) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 8) AS credit
      UNION
      SELECT 
      'Setembro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 9) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 9) AS credit
      UNION
      SELECT 
      'Outubro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 10) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 10) AS credit
      UNION
      SELECT 
      'Novembro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 11) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 11) AS credit
      UNION
      SELECT 
      'Dezembro' AS month,
      (SELECT SUM(vl_entry)*-1 FROM entries WHERE published = 1 AND status = 1 AND vl_entry < 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 12) AS debit,
      (SELECT SUM(vl_entry) FROM entries WHERE published = 1 AND status = 1 AND vl_entry >= 0.0 AND YEAR(dt_entry) = ${ano} AND MONTH(dt_entry) = 12) AS credit;`;
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

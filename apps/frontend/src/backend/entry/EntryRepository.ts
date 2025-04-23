
import { Category } from '@/core/model/Category'
import { Entry } from '@/core/model/Entry'
import { PrismaClient } from '@prisma/client'

export default class EntryRepository {

    private static db: PrismaClient = new PrismaClient()

    static async update(registry: Entry): Promise<Entry> {
        const cat = <Entry> {
            category_id: registry.category_id,
            dt_entry: registry.dt_entry,
            vl_entry: registry.vl_entry,
            nm_entry: registry.nm_entry,
            ds_category: registry.ds_category,     
            ds_subcategory: registry.ds_subcategory,     
            status: registry.status,     
            fixed_costs: registry.fixed_costs,     
            checked: registry.checked,     
            ds_detail: registry.ds_detail,     
            published: registry.published,
            mysql_id: registry.mysql_id
        }
        return await this.db.entry.update({
            where: { id: registry.id },
            data: cat
       })
    }

    static async create(registry: Entry): Promise<Entry> {
        const teste = {...registry, nm_entry: ''}
        return await this.db.entry.create({data: teste})
    }

    static async createMany(records: Partial<Entry>[]): Promise<string> {
        /*
        try {
            await this.db.entry.createMany({ data: records })
        } catch (e) {
            console.error(e);
            return "Erro ao tentar criar registros!!";
        } finally {
            return records.length + " registros inseridos no banco de dados!!";
        }        
        */
        return "Erro ao tentar criar registros!!";
    }

    static async findMany(): Promise<Entry[]> {
        return await this.db.entry.findMany({
            orderBy: [
                {
                  dt_entry: 'asc',
                },
            ],            
            //relationLoadStrategy: 'join', // or 'query'
            include: {
              category: true,
            },
        })
    }

    static async findUnique(id: number): Promise<Entry> {
        const registry = await this.db.entry.findUnique({
            where: { id },
        })
        return registry as Entry
    }

    static async delete(id: number): Promise<void> {
        await this.db.entry.delete({
            where: { id },
        })
    }

    static async aggregateBalance(now: string): Promise<number | 0.0> { 
        const dtfim = new Date(now+'T23:59:59.000Z')
        const aggregations = await this.db.entry.aggregate({
            _sum: {
              vl_entry: true,
            },
            where: {
                dt_entry: {
                    lte: dtfim,
                },
            },            
          })
        return (aggregations._sum.vl_entry ? aggregations._sum.vl_entry : 0.00);
    }
    static async findManyBalance(now: string): Promise<Entry[]> {
        let result = null;
        const dtfim = new Date(now+'T23:59:59.000Z');
        result = await this.db.entry.findMany({
            orderBy: [
                {
                  dt_entry: 'asc',
                },
            ],            
            where: {
                dt_entry: {
                    gt: dtfim,
                },
            },
            include: { category: true }
        });
        return result;
    }    

}

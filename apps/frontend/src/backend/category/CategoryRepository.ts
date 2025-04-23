
import { Category } from '@/core/model/Category'
import { PrismaClient } from '@prisma/client'

export default class CategoryRepository {

    private static db: PrismaClient = new PrismaClient()

    static async upsert(registry: Category): Promise<Category> {
        return await this.db.category.upsert({
            where: { id: registry.id },
            update: registry,
            create: registry,
        })
    }

    static async create(registry: Category): Promise<Category> {
        return await this.db.category.create({data: registry})
    }

    static async findMany(): Promise<Category[]> {
        return await this.db.category.findMany({
            //relationLoadStrategy: 'join', // or 'query'
            include: {
              entries: true,
            },
        })
    }

    static async findUnique(id: number): Promise<Category> {
        const registry = await this.db.category.findUnique({
            where: { id },
        })
        return registry as Category
    }

    static async delete(id: number): Promise<void> {
        await this.db.category.delete({
            where: { id },
        })
    }

}

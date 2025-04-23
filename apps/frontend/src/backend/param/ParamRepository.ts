
import { Param } from '@/core/model/Param'
import { PrismaClient } from '@prisma/client'

export default class ParamRepository {

    private static db: PrismaClient = new PrismaClient()

    static async upsert(registry: Param): Promise<Param> {
        return await this.db.param.upsert({
            where: { id: registry.id },
            update: registry,
            create: registry,
        })
    }

    static async create(registry: Param): Promise<Param> {
        return await this.db.param.create({data: registry})
    }

    static async findMany(): Promise<Param[]> {
        return await this.db.param.findMany()
    }

    static async findUnique(id: number): Promise<Param> {
        const registry = await this.db.param.findUnique({
            where: { id },
        })
        return registry as Param
    }

    static async delete(id: number): Promise<void> {
        await this.db.param.delete({
            where: { id },
        })
    }

    static async findLabel(label: string): Promise<string> {
        const result = await this.db.param.findFirst({
            where: {
                label,
            },
        });
        return result?.value || "2024-11-21";
    }

}

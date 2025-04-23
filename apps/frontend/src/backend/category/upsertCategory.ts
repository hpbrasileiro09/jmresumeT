'use server'

import { Category } from '@/core/model/Category'
import CategoryRepository from './CategoryRepository'

export default async function upsertCategory(registry: Partial<Category>) {
    const upsertCategory = {
        ...registry,
        id: registry.id,
    }

    return CategoryRepository.upsert(upsertCategory as Category)
}

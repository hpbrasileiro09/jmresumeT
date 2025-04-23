'use server'

import { Category } from '@/core/model/Category'
import CategoryRepository from './CategoryRepository'

export default async function createCategory(registry: Partial<Category>) {
    const newCategory = {
        ...registry
    }

    return CategoryRepository.create(newCategory as Category)
}

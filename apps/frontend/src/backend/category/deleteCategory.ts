'use server'
import CategoryRepository from './CategoryRepository'

export default async function deleteCategory(id: number) {
    return CategoryRepository.delete(id)
}

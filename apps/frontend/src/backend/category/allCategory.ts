'use server'
import CategoryRepository from './CategoryRepository'

export default async function allCategory() {
    return CategoryRepository.findMany()
}

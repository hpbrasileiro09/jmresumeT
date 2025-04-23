'use server'
import ParamRepository from './ParamRepository'

export default async function deleteParam(id: number) {
    return ParamRepository.delete(id)
}

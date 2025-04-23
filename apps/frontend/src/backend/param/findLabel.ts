'use server'
import ParamRepository from './ParamRepository'

export default async function findLabel(label: string) {
    return ParamRepository.findLabel(label)
}

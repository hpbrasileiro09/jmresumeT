'use server'
import ParamRepository from './ParamRepository'

export default async function allParam() {
    return ParamRepository.findMany()
}

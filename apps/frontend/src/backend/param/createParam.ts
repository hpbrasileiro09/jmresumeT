'use server'

import { Param } from '@/core/model/Param'
import ParamRepository from './ParamRepository'

export default async function createParam(registry: Partial<Param>) {
    const newParam = {
        ...registry
    }

    return ParamRepository.create(newParam as Param)
}

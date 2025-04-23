'use server'

import { Param } from '@/core/model/Param'
import ParamRepository from './ParamRepository'

export default async function upsertParam(registry: Partial<Param>) {
    const upsertParam = {
        ...registry,
        id: registry.id,
    }

    return ParamRepository.upsert(upsertParam as Param)
}

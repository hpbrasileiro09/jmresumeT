'use server'

import { Entry } from '@/core/model/Entry'
import EntryRepository from './EntryRepository'

export default async function upsertEntry(registry: Partial<Entry>) {
    const upsertEntry = {
        ...registry,
        id: registry.id,
    }

    return EntryRepository.update(upsertEntry as Entry)
}

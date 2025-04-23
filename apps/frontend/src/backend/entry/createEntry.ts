'use server'

import { Entry } from '@/core/model/Entry'
import EntryRepository from './EntryRepository'

export default async function createEntry(registry: Partial<Entry>) {
    const newEntry = {
        ...registry
    }

    return EntryRepository.create(newEntry as Entry)
}

'use server'

import { Entry } from '@/core/model/Entry'
import EntryRepository from './EntryRepository'

export default async function createEntryMany(records: Partial<Entry>[]): Promise<string> {
    return EntryRepository.createMany(records)
}

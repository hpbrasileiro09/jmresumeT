'use server'
import EntryRepository from './EntryRepository'

export default async function aggregateBalance(now: string) {
    return EntryRepository.aggregateBalance(now)
}

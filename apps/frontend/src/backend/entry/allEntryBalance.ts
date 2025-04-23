'use server'
import EntryRepository from './EntryRepository'

export default async function allEntryBalance(data: string) {
    return EntryRepository.findManyBalance(data)
}

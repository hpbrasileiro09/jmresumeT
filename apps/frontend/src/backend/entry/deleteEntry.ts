'use server'
import EntryRepository from './EntryRepository'

export default async function deleteEntry(id: number) {
    return EntryRepository.delete(id)
}

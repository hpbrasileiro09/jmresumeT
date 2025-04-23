'use server'
import EntryRepository from './EntryRepository'

export default async function allEntry() {
    return EntryRepository.findMany()
}

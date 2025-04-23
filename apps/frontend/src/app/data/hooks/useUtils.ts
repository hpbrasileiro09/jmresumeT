import { Entry } from "@/core/model/Entry"
import { useState } from "react"

export default function useUtils() {

    const [now, setNow] = useState<string>("2024-11-01")

    const [entry, setEntry] = useState<Partial<Entry> | null>(null)

    async function save() {
        if (!entry) return
        setEntry(null)
    }

    async function create() {
        if (!entry) return
        setEntry(null)
    }

    async function remove() {
        if (!entry || !entry.id) return
        setEntry(null)
    }

    async function createMany(records: Partial<Entry>[]): Promise<string> {
        const message: string = ""
        setEntry(null)
        return message
    }
        
    return {
        now,
        entry,
        save,
        create,
        remove,
        setEntry,
        cancel: () => setEntry(null),
        createEntry: (entry: Partial<Entry> | null) => setEntry(entry),        
        updateEntry: (entry: Partial<Entry> | null) => { 
            setEntry(entry)
        }
    }
}
    


import Backend from '@/backend'
import { Entry } from '@/core/model/Entry'
import { EntryL } from '@/core/model/EntryL'
import { EntryM } from '@/core/model/EntryM'
import { useEffect, useState } from 'react'

export default function useEntriesDb() {

    const [contador, setContador] = useState(0)
    const [now, setNow] = useState<string>("2024-11-01")
    const [label, setLabel] = useState<string>("agora")
    const [balance, setBalance] = useState(0.0)
    const [mensagem, setMensagem] = useState<string>("")
    const [entries, setEntries] = useState<EntryL[]>([])
    const [entry, setEntry] = useState<Partial<Entry> | null>(null)

    useEffect(() => {
        Backend.params.findLabel(label).then(setNow)
        Backend.entries.aggregateBalance(now).then(setBalance)
        Backend.entries.allBalance(now).then(setEntries)
    }, [label, now])

    async function save() {
        if (!entry) return
        await Backend.entries.update(entry)
        const entries = await Backend.entries.all()
        setEntries(entries)
        setEntry(null)
    }

    async function create() {
        if (!entry) return
        await Backend.entries.create(entry)
        const entries = await Backend.entries.all()
        setEntries(entries)
        setEntry(null)
    }

    async function createMany(records: Partial<EntryM>[]): Promise<string> {
        const message: string = await Backend.entries.createMany(records)
        const entries = await Backend.entries.all()
        setEntries(entries)
        setEntry(null)
        return message
    }

    async function remove() {
        if (!entry || !entry.id) return
        await Backend.entries.delete(entry.id)
        const entries = await Backend.entries.all()
        setEntries(entries)
        setEntry(null)
    }

    return {
        now,
        entries,
        entry,
        balance,
        setMensagem,
        setNow,
        setLabel,
        save,
        create,
        createMany,
        remove,
        getMensagem: () => { return mensagem },
        cancel: () => setEntry(null),
        createEntry: (entry: Partial<Entry> | null) => setEntry(entry),
        updateEntry: (entry: Partial<Entry> | null) => { 
            let cont = contador + 1
            console.log('contador|', cont, '|entry', entry, )
            setEntry(entry)
            setContador(cont) 
        }
    }
}

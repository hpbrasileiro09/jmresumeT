'use client'
import moment from "moment"
import { createContext, useCallback, useEffect, useState } from 'react'
import { Entry } from '@/core/model/Entry' 
import FiltrarEntries from '@/core/model/FiltrarEntries' 
import useAPI from '../hooks/useAPI' 

export interface ContextoEntriesProps {
    agora: string
    entry: Partial<Entry> | null
    entries: Entry[]
    pesquisa: string
    save: (entry: Partial<Entry>) => Promise<void>
    create: (entry: Partial<Entry>) => Promise<void>
    remove: (entry: Partial<Entry>) => Promise<void>
    cancel: () => void
    createEntry: (entry: Partial<Entry> | null) => void
    updateEntry: (entry: Partial<Entry> | null) => void
    setPesquisa: (pesquisa: string) => void
    entryPorId: (id: number) => Entry | null
    balance: number
}

const ContextoEntries = createContext<ContextoEntriesProps>({} as any)

export function ProvedorEntries(props: any) {

    const { httpGet, httpPost, httpPatch, httpDelete } = useAPI()
    const [agora] = useState<string>("2024-11-01")
    const [pesquisa, setPesquisa] = useState<string>('')
    const [entry, setEntry] = useState<Partial<Entry> | null>(null)
    const [entries, setEntries] = useState<Entry[]>([])
    const [balance, setBalance] = useState<number>(0.0)

    const carregarEntries = useCallback(async () => {
        const param = await httpGet('/params/label/agora')
        const sumvlentry = await httpGet('/entries/sumvlentry/' + param.value)
        const entries = await httpGet('/entries/byparam/' + param.value)
        setBalance(sumvlentry._sum.vl_entry ?? 0.0)
        setEntries(entries ?? [])
    }, [httpGet])

    const create = useCallback(async (lentry: Partial<Entry>) => {
        if (!lentry) return
        const dt_temp = moment(lentry.dt_entry, "YYYY-MM-DD").toISOString()
        var dt_entry = dt_temp + "T00:00:00.000Z";
        const yentry = { ...lentry, dt_entry: moment(dt_entry, "YYYY-MM-DD").toISOString() as unknown as Date }
        await httpPost('/entries', yentry)
        carregarEntries()
        setEntry(null)
    }, [httpPost])

    const save = useCallback(async (lentry: Partial<Entry>) => {
        if (!lentry) return
        const xentry: Partial<Entry> = (({ category, ...rest }) => rest)(lentry);
        const yentry = { ...xentry, dt_entry: moment(xentry.dt_entry, "YYYY-MM-DD").toISOString() as unknown as Date }
        await httpPatch(`/entries/${lentry?.id}`, yentry)
        carregarEntries()
        setEntry(null)
    }, [httpPatch])

    const remove = useCallback(async (lentry: Partial<Entry>) => {
        if (!lentry || !lentry.id) return
        await httpDelete(`/entries/${lentry?.id}`)
        carregarEntries()
        setEntry(null)
    }, [httpDelete])

    useEffect(() => {
        carregarEntries()
    }, [carregarEntries])

    return (
        <ContextoEntries.Provider
            value={{
                agora,
                entry,
                save,
                create,
                remove,
                pesquisa,
                get entries() {
                    if (!pesquisa) return entries
                    return new FiltrarEntries().executar(pesquisa, entries)
                },
                setPesquisa,
                cancel: () => setEntry(null),
                entryPorId: (id: number) => entries.find((entry) => entry.id === id) ?? null,
                createEntry: (entry: Partial<Entry> | null) => setEntry(entry), 
                updateEntry: (entry: Partial<Entry> | null) => setEntry(entry),
                balance
            }}
        >
            {props.children}
        </ContextoEntries.Provider>
    )
    
}

export default ContextoEntries

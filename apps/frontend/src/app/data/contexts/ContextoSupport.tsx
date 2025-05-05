'use client'
import moment from "moment"
import { createContext, useCallback, useEffect, useState } from 'react'
import { Entry } from '@/core/model/Entry' 
import useAPI from '../hooks/useAPI' 
import { ICard } from "@/core/model/ICard"

export interface ContextoSupportProps {
    agora: string
    entry: Partial<Entry> | null
    entries: Entry[]
    pesquisa: string
    search: string
    action_id: number
    all_actions: ICard[]
    setSearch: (search: string) => void
    setActionId: (action_id: number) => void
    save: (search: string, dt_search: string, entry: Partial<Entry>) => Promise<void>
    create: (search: string, dt_search: string, entry: Partial<Entry>) => Promise<void>
    remove: (search: string, dt_search: string, entry: Partial<Entry>) => Promise<void>
    cancel: () => void
    createEntry: (entry: Partial<Entry> | null) => void
    updateEntry: (entry: Partial<Entry> | null) => void
    setPesquisa: (pesquisa: string) => void
    entryPorId: (id: number) => Entry | null
    carregarEntries: (search: string, dt_search: string) => Promise<void>
    balance: number
}

const ContextoSupport = createContext<ContextoSupportProps>({} as any)

export function ProvedorSupport(props: any) {

    const all_actions: ICard[] = [
        { id: 1, label: "Update", value: "upate", dia: 0 },
        { id: 2, label: "Delete",       value: "delete", dia: 0 },
        { id: 3, label: "Copy",     value: "copy", dia: 0 },
    ]

    const { httpGet, httpPost, httpPatch, httpDelete } = useAPI()
    const [agora] = useState<string>("2024-11-01")
    const [pesquisa, setPesquisa] = useState<string>('')
    const [entry, setEntry] = useState<Partial<Entry> | null>(null)
    const [entries, setEntries] = useState<Entry[]>([])
    const [balance, setBalance] = useState<number>(0.0)
    const [search, setSearch] = useState("")
    const [action_id, setActionId] = useState(1)

    const carregarEntries = useCallback(async (search: string, dt_search: string) => {
        const entries = await httpGet('/entries/search/' + search + '/dt_search/' + dt_search)
        setBalance(0.0)
        setEntries(entries ?? [])
    }, [httpGet])

    const create = useCallback(async (search: string, dt_search: string, lentry: Partial<Entry>) => {
        if (!lentry) return
        const dt_temp = moment(lentry.dt_entry, "YYYY-MM-DD").toISOString()
        var dt_entry = dt_temp + "T00:00:00.000Z";
        const yentry = { ...lentry, dt_entry: moment(dt_entry, "YYYY-MM-DD").toISOString() as unknown as Date }
        await httpPost('/entries', yentry)
        carregarEntries(search, dt_search)
        setEntry(null)
    }, [httpPost])

    const save = useCallback(async (search: string, dt_search: string, lentry: Partial<Entry>) => {
        if (!lentry) return
        const xentry: Partial<Entry> = (({ category, ...rest }) => rest)(lentry);
        const yentry = { ...xentry, dt_entry: moment(xentry.dt_entry, "YYYY-MM-DD").toISOString() as unknown as Date }
        await httpPatch(`/entries/${lentry?.id}`, yentry)
        carregarEntries(search, dt_search)
        setEntry(null)
    }, [httpPatch])

    const remove = useCallback(async (search: string, dt_search: string, lentry: Partial<Entry>) => {
        if (!lentry || !lentry.id) return
        await httpDelete(`/entries/${lentry?.id}`)
        carregarEntries(search, dt_search)
        setEntry(null)
    }, [httpDelete])

    return (
        <ContextoSupport.Provider
            value={{
                agora,
                entry,
                save,
                create,
                remove,
                pesquisa,
                search,
                action_id,
                all_actions,
                setSearch,
                setActionId,
                get entries() {
                    return entries
                },
                setPesquisa,
                cancel: () => setEntry(null),
                entryPorId: (id: number) => entries.find((entry) => entry.id === id) ?? null,
                createEntry: (entry: Partial<Entry> | null) => setEntry(entry), 
                updateEntry: (entry: Partial<Entry> | null) => setEntry(entry),
                carregarEntries,
                balance
            }}
        >
            {props.children}
        </ContextoSupport.Provider>
    )
    
}

export default ContextoSupport

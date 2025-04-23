'use client'

import EntryForm from '@/components/entries/EntryForm'
import useEntries from '@/app/data/hooks/useEntriesDb'
import useCategories from '@/app/data/hooks/useCategories';

import { useState } from 'react'

import { Input } from "@/components/ui/input"
import TableList from './TableList'

export default function Page() {

    const { categories } = useCategories()

    const [busca, setBusca] = useState('')

    const { now, entry, entries, balance, save, create, remove, createEntry, updateEntry } = useEntries()

    const colabs = entries.filter((item) => { 
        return item.ds_category.toLowerCase().includes(busca.toLowerCase())
    });

    return (
        <div>
            {entry ? (
                <EntryForm
                    categories={categories}
                    entry={entry}
                    onChange={updateEntry}
                    salvar={save}
                    criar={create}
                    cancelar={() => updateEntry(null)}
                    excluir={remove}
                />
            ) : (
                <>
                    <div className="flex justify-end">
                        <button
                            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md"
                            onClick={() => createEntry({category_id: 1, dt_entry: new Date(), status: 1, checked: 0, fixed_costs: 0, published: 1, vl_entry: 0.0, mysql_id: 0})}
                        >
                            <span>New Entry</span>
                        </button>
                    </div>
                    <Input 
                        className="bg-zinc-800 text-zinc-100" 
                        type="text" 
                        id="buscar" 
                        placeholder="Buscar" 
                        value={busca} 
                        onChange={(e) => setBusca(e.target.value) } />
                    <TableList entries={colabs} balance={balance} now={now} onClick={updateEntry} />
                </>
            )}
        </div>
    )
}

'use client'

import moment from "moment"

import useCategories from '@/app/data/hooks/useCategories';
import useEntries from "@/app/data/hooks/useEntries";

import { Plus } from "lucide-react"

import TableList from './TableList'
import EntryForm from './EntryForm';

export default function Janela() {

  const { categories } = useCategories()
  
  const { 
    agora, 
    entry, 
    save, 
    create, 
    remove, 
    createEntry, 
    updateEntry,
    entries,
    balance,
    pesquisa
  } = useEntries()

  const saveEntry = () => {
    if (entry)
      save(entry)
  }

  const newEntry = () => {
    if (entry)
      create(entry)
  }

  const removeEntry = () => {
    if (entry)
      remove(entry)
  }

  return (
    <div>
      {entry ? (
        <>
          <EntryForm
              categories={categories}
              entry={entry}
              onChange={updateEntry}
              salvar={saveEntry}
              criar={newEntry}
              cancelar={() => updateEntry(null)}
              excluir={removeEntry}
          />
        </>
      ) : (
        <>
          <div className="flex justify-end">
              <button
                  className="flex items-center gap-2 bg-zinc-500 px-2 py-2 rounded-full"
                  onClick={() => createEntry({
                    category_id: 1,
                    ds_category: "",
                    ds_subcategory: "",
                    ds_detail: "", 
                    dt_entry: moment(new Date(), "YYYY-MM-DD").toISOString() as unknown as Date, 
                    status: 1, 
                    checked: 0, 
                    fixed_costs: 0, 
                    published: 1, 
                    vl_entry: 0.0, 
                    mysql_id: 0,
                    nm_entry: ""
                  })}
              >
                  <Plus className="h-5 w-5" />
              </button>
          </div>        
          <TableList entries={entries} balance={pesquisa.length <= 0 ? balance : 0.0} now={agora} onClick={updateEntry} />
        </>
      )}
    </div>
  )

}

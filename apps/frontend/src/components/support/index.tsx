'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Wrench } from "lucide-react";
import TableList from './TableList'
import useSupport from "@/app/data/hooks/useSupport";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label";
import { Search, Save } from "lucide-react"
import moment from "moment"
import Dropdown from '@/components/utils/dropdown';

export default function Page() {

  const {
    agora,
    search,
    entries,
    action_id,
    all_actions,
    remove,
    setSearch,
    setActionId,
    updateEntry,
    carregarEntries,
  } = useSupport()

  const [dt_entry, setDtEntry] = useState<Date>(moment(new Date(), "YYYY-MM-DD").toISOString() as unknown as Date)

  const [checks, setChecks] = useState<number[]>([])

  const handleSearch = (value: string) => {
    setSearch(value)
  }   

  const dataAtualFormatada = (data: string) => {
    const myArray = data.substring(0, 10).split("-");
    const retorno = myArray[0] + "-" + myArray[1] + "-" + myArray[2]
    return retorno
  } 
  
  const startSearch = () => {
    if (search.length > 3) {
      carregarEntries(search, dt_entry.toString())
    } else {
      carregarEntries('nothing', dt_entry.toString())
    }
  }

  const startAction = () => {
    console.log('startAction')
    if (action_id == 2) { // Delete
      console.log('Delete_' + action_id.toString())
      checks.map((elemento: number) => {
        const item = entries.find((el) => el.id === elemento);
        if (item) {
            console.log(elemento, item.id)
            remove(search, dt_entry.toString().substring(0, 10), item)
        }
      })    
    }
  }

  const handleDtEntry = (value: string) => {
      const dt_teste = new Date(value)
      setDtEntry(moment(dt_teste, "YYYY-MM-DD").toISOString() as unknown as Date)
  }

  const handleActionId = (value: number) => {
    setActionId(value)
  }

  const handleCheckboxChange = (numero: number) => {
    setChecks((prevSelecionados) =>
      prevSelecionados.includes(numero)
        ? prevSelecionados.filter((n) => n !== numero)
        : [...prevSelecionados, numero]
    );
  }

  return (
    <Card>
        <CardHeader>
        <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
            Support
            </CardTitle>
            <Wrench className="ml-auto" />
        </div>
        <CardDescription>
            Support
        </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="flex flex-row gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label className="text-muted-foreground" htmlFor="search">Search</Label>
                  <Input 
                      className="bg-zinc-800 text-zinc-100" 
                      type="text" 
                      id="search" 
                      placeholder="Search" 
                      value={search} 
                      onChange={(e) => handleSearch(e.target.value)} />
                </div>
                <div>
                  <input 
                        type="date" 
                        name="dt_entry"
                        className="bg-zinc-400 mt-6"
                        value={dataAtualFormatada(dt_entry?.toString() || "")}
                        onChange={(e) => handleDtEntry(e.target.value)} />
                </div>
                <button
                    className="flex mt-5 w-8 h-8 items-center gap-2 bg-zinc-500 px-2 py-2 rounded-full"
                    onClick={() => startSearch()}>
                    <Search className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-row gap-2">
                <div className="mt-5">
                  <Dropdown 
                      drop_id={action_id}
                      drop_nm={"Update"}
                      registers={all_actions}
                      label="Action"
                      handleDropId={handleActionId} />                            
                </div>
                <button
                    className="flex mt-5 w-8 h-8 items-center gap-2 bg-zinc-500 px-2 py-2 rounded-full"
                    onClick={() => startAction()}>
                    <Save className="h-5 w-5" />
                </button>
              </div>
            </div>
            <TableList checks={checks} handleCheckboxChange={handleCheckboxChange} setChecks={setChecks} entries={entries} balance={0.0} now={agora} onClick={updateEntry} />
        </CardContent>
    </Card>        
  )

}

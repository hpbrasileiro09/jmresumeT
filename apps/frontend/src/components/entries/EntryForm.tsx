
import { Entry } from '@/core/model/Entry'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import moment from "moment"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Category } from '@/core/model/Category';
import { useEffect, useState } from 'react';
   
import Combobox from '@/components/utils/combobox';

export interface EntryFormProps {
    entry: Partial<Entry>
    categories: Category[]
    onChange: (entry: Partial<Entry>) => void
    salvar: () => void
    criar: () => void
    cancelar: () => void
    excluir: () => void
}

export default function EntryForm(props: EntryFormProps) {

    const [category_id, setCategoryId] = useState(1) //props.entry.category_id)

    const [category_nm, setCategoryNm] = useState("Dummy")

    const [vl_entry, setVlEntry] = useState(props.entry.vl_entry?.toFixed(2).toString())

    const dataAtualFormatada = (data: string) => {
        const myArray = data.substring(0, 10).split("-");
        const retorno = myArray[0] + "-" + myArray[1] + "-" + myArray[2]
        return retorno
    } 

    const stringToDate = (_date: string, _format: string, _delimiter: string) => {
        var formatLowerCase=_format.toLowerCase();
        var formatItems=formatLowerCase.split(_delimiter);
        var dateItems=_date.split(_delimiter);
        var monthIndex=formatItems.indexOf("mm");
        var dayIndex=formatItems.indexOf("dd");
        var yearIndex=formatItems.indexOf("yyyy");
        var month=parseInt(dateItems[monthIndex]);
        month-=1;
        var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]));
        return formatedDate;
    }

    const handleCategoryId = (value: number) => {
        props.onChange?.({ ...props.entry, category_id: value})
        setCategoryId(value)
    }

    const handleDtEntry = (value: string) => {
        const dt_teste = new Date(value)
        props.onChange?.({ ...props.entry, dt_entry: moment(dt_teste, "YYYY-MM-DD").toISOString() as unknown as Date })
    }

    const handleVlEntry = (value: string) => {
        props.onChange?.({ ...props.entry, vl_entry: parseFloat(value) })
        setVlEntry(value)
    }

    useEffect(() => {
        const item = props.categories.find((category: Category) => category.id === category_id)
        setCategoryNm(item?.name || "Dummy")
    }, [category_id]); 

    return (
    <Card className="w-[600px] bg-zinc-400">
      <CardHeader>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5">
                <Combobox 
                    category_id={props.entry.category_id || 1}
                    category_nm={category_nm}
                    categories={props.categories}
                    handleCategoryId={handleCategoryId} />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <Input 
                    className="bg-zinc-800 text-zinc-100" 
                    type="text" 
                    id="ds_category" 
                    placeholder="Description" 
                    value={props.entry.ds_category} 
                    onChange={(e) => props.onChange?.({ ...props.entry, ds_category: e.target.value })} />
                <Input 
                    className="bg-zinc-800 text-zinc-100" 
                    type="text" 
                    id="ds_subcategory" 
                    placeholder="Sub Desc." 
                    value={props.entry.ds_subcategory} 
                    onChange={(e) => props.onChange?.({ ...props.entry, ds_subcategory: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 gap-5">
                <Textarea 
                    className="bg-zinc-800 text-zinc-100" 
                    placeholder="Detail" 
                    id="ds_detail" 
                    value={props.entry.ds_detail} 
                    onChange={(e) => props.onChange?.({ ...props.entry, ds_detail: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <input 
                    type="date" 
                    name="dt_entry"
                    value={dataAtualFormatada(props.entry.dt_entry?.toString() || "")}
                    onChange={(e) => handleDtEntry(e.target.value)} />
                <Input 
                    className="bg-zinc-800 text-zinc-100" 
                    type="text" 
                    id="vl_entry" 
                    placeholder="Vl. Entry" 
                    value={vl_entry}
                    onChange={(e) => handleVlEntry(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 gap-5">
                <input
                  type="checkbox"
                  name="status"
                  value={props.entry.status}
                  checked={(props.entry.status == 1 ? true : false)}
                  onChange={(e) => props.onChange?.({ ...props.entry, status: (e.target.checked == true ? 1 : 0)})}
                />
                <input
                  type="checkbox"
                  name="fixed_costs"
                  value={props.entry.fixed_costs}
                  checked={(props.entry.fixed_costs == 1 ? true : false)}
                  onChange={(e) => props.onChange?.({ ...props.entry, fixed_costs: (e.target.checked == true ? 1 : 0)})}
                />
                <input
                  type="checkbox"
                  name="checked"
                  value={props.entry.checked}
                  checked={(props.entry.checked == 1 ? true : false)}
                  onChange={(e) => props.onChange?.({ ...props.entry, checked: (e.target.checked == true ? 1 : 0)})}
                />
                <input
                  type="checkbox"
                  name="published"
                  value={props.entry.published}
                  checked={(props.entry.published == 1 ? true : false)}
                  onChange={(e) => props.onChange?.({ ...props.entry, published: (e.target.checked == true ? 1 : 0)})}
                />
            </div>
        </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-5">
        <div className="flex justify-start gap-5">
        { props.entry.id ? (
        <button className="bg-blue-500 px-4 py-2 rounded-md" onClick={props.salvar}>
            Salvar
        </button> ) : (
        <button className="bg-red-500 px-4 py-2 rounded-md" onClick={props.criar}>
            Criar
        </button>
        )}
        <button className="bg-zinc-500 px-4 py-2 rounded-md" onClick={props.cancelar}>
            Voltar
        </button>
        </div>
        { props.entry.id ? (
        <button className="bg-red-500 px-4 py-2 rounded-md" onClick={props.excluir}>
            Excluir
        </button> ) : ( '' )}
      </CardFooter>
    </Card>        
    )
}

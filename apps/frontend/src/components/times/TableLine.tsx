import { Entry } from '@/core/model/Entry'
import { Badge } from '../ui/badge'

import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

export interface EntryLineProps {
    entry: Entry
    balance: number
    quebra: boolean
    month: number
    onClick?: (entry: Entry) => void
}

export default function TableLine(props: EntryLineProps) {

    const montaMes = (mes: number) => {
        const meses = [
            '',
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ]
        return meses[mes]
    }

    const dataAtualFormatada = (data: string) => {
        const myArray = data.split("-");
        return myArray[2] + "/" + myArray[1] + "/" + myArray[0]
    }    

    let vlClassNameVE = "text-right text-green-500 font-medium"
    let vlClassNameBL = "text-right text-green-500 font-medium"
    if (props.entry.vl_entry < 0.0) vlClassNameVE = "text-sm text-right text-red-500 font-medium"
    if (props.balance < 0.0) vlClassNameBL = "text-sm text-right text-red-500 font-medium"
    return (
        <>
        {props.quebra == true && <TableRow><TableCell colSpan={6} className="bg-zinc-300 text-right">{montaMes(props.month)}</TableCell></TableRow>}
        <TableRow key={props.entry.id} onClick={() => { props.onClick?.(props.entry) }}>
            <TableCell>{dataAtualFormatada(props.entry.dt_entry.toString().substring(0, 10))}</TableCell>
            <TableCell className="font-medium">{props.entry.ds_category}</TableCell>
            <TableCell>{props.entry.ds_subcategory && <Badge>{props.entry.ds_subcategory}</Badge>}</TableCell>
            <TableCell>{props.entry.category?.name}</TableCell>
            <TableCell className={vlClassNameVE}>{props.entry.vl_entry.toFixed(2)}</TableCell>
        </TableRow>
        </>
    )
}

import { Entry } from '@/core/model/Entry'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import TableLine from './TableLine' 
import FiltroEntries from './FiltroEntries'

export interface TableListProps {
    now: string
    balance: number
    entries: Entry[]
    onClick?: (entry: Entry) => void
}

export default function TableList(props: TableListProps) {
    
    let month = 0
    let icont = -1
    let quebra = false
    let saldo = props.balance

    const dataAtualFormatada = (data: string) => {
        if (data != null) {
            if (data.length > 0) {
                const myArray = data.split("-");
                return myArray[2] + "/" + myArray[1] + "/" + myArray[0]
            } else {
                return "01" + "/" + "11" + "/" + "2024"
            }
        } else {
            return "02" + "/" + "11" + "/" + "2024"
        }
    }    

    const getMonth = (data: string) => {
        const myArray = data.split("-");
        return parseInt(myArray[1])
    }    

    let vlClassNameBL = "text-right text-green-500 font-medium"
    if (props.balance < 0.0) vlClassNameBL = "text-right text-right text-red-500 font-medium"

    return (
        <>
        <div>
            <FiltroEntries />
        </div>
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[60px]">Datex</TableHead>
            <TableHead className="w-[400px]">Description</TableHead>
            <TableHead></TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Vl. Entry</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>{dataAtualFormatada(props.now)}</TableCell>
                <TableCell className="font-medium">Balance</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className={vlClassNameBL}>{props.balance.toFixed(2)}</TableCell>
                <TableCell className={vlClassNameBL}>{props.balance.toFixed(2)}</TableCell>
            </TableRow>
            {props.entries.map((entry: Entry) => {
                saldo += entry.vl_entry
                icont += 1
                quebra = false
                if (icont == 0) month = getMonth(entry.dt_entry.toString())
                if (month != getMonth(entry.dt_entry.toString())) { 
                    month = getMonth(entry.dt_entry.toString())
                    quebra = true
                }
                return <TableLine key={entry.id+1} quebra={quebra} month={month} entry={entry} balance={saldo} onClick={props.onClick} />
            })}
        </TableBody>
        <TableFooter>
            <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{saldo.toFixed(2)}</TableCell>
            </TableRow>
        </TableFooter>
        </Table>        
        </>
    )
}

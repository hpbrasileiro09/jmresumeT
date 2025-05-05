import { Entry } from '@/core/model/Entry'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import TableLine from './TableLine' 

export interface TableListProps {
    now: string
    entries: Entry[]
}

export default function TableList(props: TableListProps) {
    
    let month = 0
    let total = 0.0
    let quebra = false

    let vlClassNameBLRG = "text-right text-green-500 font-medium"
    let vlClassNameBLRR = "text-right text-red-500 font-medium"

    return (
        <>
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[60px]">Date</TableHead>
            <TableHead className="w-[400px]">Description</TableHead>
            <TableHead></TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Vl. Entry</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {props.entries.map((entry: Entry) => {
                total += entry.vl_entry
                return <TableLine key={entry.id} quebra={quebra} month={month} entry={entry} balance={0} />
            })}
        </TableBody>
        <TableFooter>
            <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className={total < 0.0 ? vlClassNameBLRR : vlClassNameBLRG }>{total.toFixed(2)}</TableCell>
            </TableRow>
        </TableFooter>
        </Table>        
        </>
    )
}

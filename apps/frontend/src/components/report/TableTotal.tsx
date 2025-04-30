
import { Mes } from '@/core/model/Mes'

import { Graph0 } from '@/core/model/Graph0'

import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

export interface TableTotalProps {
    tipo: number
    categoriesS: Graph0[]
}

export default function TableTotal(props: TableTotalProps) {

    let vlClassNameBL = "text-right text-red-500 font-medium"

    vlClassNameBL = (props.tipo == 0 ? "text-right text-green-500 font-medium" : vlClassNameBL)

    return (
        <>
        <TableRow>
            <TableCell></TableCell>
            <TableCell className="font-medium">Total</TableCell>
            {props.categoriesS.map((item: Graph0, index: number) => {
                const valor = (props.tipo == 0 ? item.credit : item.debit)
                return <TableCell key={index} className={vlClassNameBL}>{valor}</TableCell>
            })}            
        </TableRow>
        </>
    )
}

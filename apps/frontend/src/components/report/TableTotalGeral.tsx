
import { Mes } from '@/core/model/Mes'

import { Graph0 } from '@/core/model/Graph0'

import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

export interface TableTotalGeralProps {
    categoriesS: Graph0[]
}

export default function TableTotalGeral(props: TableTotalGeralProps) {

    const vlClassNameBLR = "text-right text-red-500 font-medium"

    const vlClassNameBLG = "text-right text-green-500 font-medium"

    const calcTotal = ((credit: number, debit: number): number => {
        const resposta = Number(credit) - Number(debit)
        return resposta
    })

    return (
        <>
        <TableRow>
            <TableCell></TableCell>
            <TableCell className="font-medium">Geral</TableCell>
            {props.categoriesS.map((item: Graph0, index: number) => {
                const valor = calcTotal(item.credit, item.debit)
                return <TableCell key={index} className={(valor < 0.0 ? vlClassNameBLR : vlClassNameBLG)}>{valor.toFixed(2)}</TableCell>
            })}            
        </TableRow>
        </>
    )
}

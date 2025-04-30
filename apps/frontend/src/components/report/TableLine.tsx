
import { Mes } from '@/core/model/Mes'

import { Category } from '@/core/model/Category'

import { Entry } from '@/core/model/Entry'

import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

export interface CategoryLineProps {
    tipo: number
    meses: Mes[]
    category: Category
}

export default function TableLine(props: CategoryLineProps) {

    let vlClassNameBL = "text-right text-red-500 font-medium"

    vlClassNameBL = (props.tipo == 0 ? "text-right text-green-500 font-medium" : vlClassNameBL)

    const getMonth = (data: string) => {
        const myArray = data.split("-");
        return parseInt(myArray[1])
    }    

    const calcMonth = (mes_id: number): string => {
        let resposta = 0.0
        props.category.entries?.map((entry: Entry) => {
            if (getMonth(entry.dt_entry.toString().substring(0, 10)) == mes_id) {
                if (props.tipo == 0) {
                    if (entry.vl_entry >= 0.0) {
                        resposta += entry.vl_entry
                    }
                } else {
                    if (entry.vl_entry < 0.0) {
                        resposta += (entry.vl_entry*-1)
                    }
                }
            }
        })
        return resposta.toFixed(2)
    }

    return (
        <>
        <TableRow key={props.category.id}>
            <TableCell>{props.category.ordem}</TableCell>
            <TableCell className="font-medium">{props.category.name}({props.category.id})</TableCell>
            {props.meses.map((mes: Mes) => {
                const valor = calcMonth(mes.id)
                return <TableCell className={vlClassNameBL} key={mes.id}>{(valor == '0.00' ? '-' : valor)}</TableCell>
            })}            
        </TableRow>
        </>
    )
}

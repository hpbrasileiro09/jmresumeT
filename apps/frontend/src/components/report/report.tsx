'use client'

import { Category } from '@/core/model/Category'
import { Mes } from '@/core/model/Mes'
import Meses from './meses'

export interface ReportProps {
    categoriesC: Category[]
    categoriesD: Category[]
}

export default function Report(props: ReportProps) {

    const meses = [
        { month: "Janeiro",   id:  1 },
        { month: "Fevereiro", id:  2 },
        { month: "Março",     id:  3 },
        { month: "Abril",     id:  4 },
        { month: "Mail",      id:  5 },
        { month: "Junho",     id:  6 },
        { month: "Julho",     id:  7 },
        { month: "Agosto",    id:  8 },
        { month: "Setembro",  id:  9 },
        { month: "Outubro",   id: 10 },
        { month: "Novembro",  id: 11 },
        { month: "Dezembro",  id: 12 },
    ]

  return (
    <div>
        <br />
        Crédito
        <br /><br />
        {props.categoriesC.length &&
            props.categoriesC.map((category: Category) => {
                return <><div key={category.id}>{category.id}|{category.name}|{category.entries?.length}|{category.entries?.reduce(function(prev, current) {
                    return prev + (current.vl_entry > 0.0 ? current.vl_entry : 0.0)
                  }, 0)}</div><Meses meses={meses} /></>
            })
        }
        <br />
        Débito
        <br /><br />
        {props.categoriesD.length &&
            props.categoriesD.map((category: Category) => {
                return <><div key={category.id}>{category.id}|{category.name}|{category.entries?.length}|{category.entries?.reduce(function(prev, current) {
                    return prev + (current.vl_entry < 0.0 ? current.vl_entry : 0.0)
                  }, 0)}</div><Meses meses={meses} /></>
            })
        }
    </div>
  )

}

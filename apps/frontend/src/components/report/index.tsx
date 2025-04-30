'use client'

import { Mes } from '@/core/model/Mes'

import TableList from "./TableList";
import TableTotalGeral from './TableTotalGeral'
import useReport from "@/app/data/hooks/useReport";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState } from 'react';

export default function Page() {

  const [credits, setCredits] = useState([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);

  const { 
    categoriesS, 
    categoriesC, 
    categoriesD 
  } = useReport()

  const updateValueAtIndex = (index: number, newValue: number) => {
      setCredits(credits =>
        credits.map((num, i) => (i === index ? newValue : num))
      )
  }

  const meses = [
    { month: "Janeiro",   id:  1 },
    { month: "Fevereiro", id:  2 },
    { month: "Março",     id:  3 },
    { month: "Abril",     id:  4 },
    { month: "Maio",      id:  5 },
    { month: "Junho",     id:  6 },
    { month: "Julho",     id:  7 },
    { month: "Agosto",    id:  8 },
    { month: "Setembro",  id:  9 },
    { month: "Outubro",   id: 10 },
    { month: "Novembro",  id: 11 },
    { month: "Dezembro",  id: 12 },
  ]

  let vlClassNameBL = "text-right font-medium"

  return (
    <div>
        <h3>Report</h3>
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[60px]">Id</TableHead>
            <TableHead className="w-[400px]">Category</TableHead>
            {meses.map((mes: Mes) => {
                return <TableHead className={vlClassNameBL} key={mes.id}>{mes.month}</TableHead>
            })}            
            </TableRow>
        </TableHeader>
        <TableBody>
          <TableList tipo={0} categories={categoriesC} categoriesS={categoriesS} meses={meses} />
          <TableList tipo={1} categories={categoriesD} categoriesS={categoriesS} meses={meses} />
          <TableTotalGeral categoriesS={categoriesS} />
        </TableBody>
        </Table>        
    </div>
  )

}

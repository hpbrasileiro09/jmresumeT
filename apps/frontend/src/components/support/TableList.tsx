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
import { useState, useEffect } from 'react'

export interface TableListProps {
    now: string
    balance: number
    entries: Entry[]
    checks: number[]
    onClick?: (entry: Entry) => void
    setChecks: (checks: number[]) => void
    handleCheckboxChange: (numero: number) => void
}

export default function TableList(props: TableListProps) {
    
    let saldo = props.balance

    const [vlcheck, setVlCheck] = useState(0.0)

    const todosSelecionados = props.checks.length === props.entries.length;

    const toggleSelecionarTodos = () => {
        if (todosSelecionados) {
          props.setChecks([]); // desmarcar todos
        } else {
          let temp: number[] = []
          props.entries.map((entry: Entry) => {
            temp.push(entry.id)
          })
          props.setChecks([...temp]); // marcar todos
        }
    }

    const calcChecks = () => {
        let vlcalc = 0.0
        props.checks.map((elemento: number) => {
            const item = props.entries.find((el) => el.id === elemento);
            if (item) {
                vlcalc += item.vl_entry
            }
        })
        setVlCheck(vlcalc)
    }

    useEffect(() => {
        calcChecks()
    }, [props.checks])

    let vlClassNameBL = "text-right text-green-500 font-medium"
    if (props.balance < 0.0) vlClassNameBL = "text-right text-right text-red-500 font-medium"

    return (
        <>
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead>
                    <input
                    type="checkbox"
                    name="all"
                    value={0}
                    checked={todosSelecionados}
                    onChange={toggleSelecionarTodos} />
                </TableHead>
                <TableHead className="w-[60px]">Date</TableHead>
                <TableHead className="w-[400px]">Description</TableHead>
                <TableHead></TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Vl. Entry</TableHead>
                <TableHead className="text-right">Balance</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {props.entries.map((entry: Entry) => {
                saldo += entry.vl_entry
                return <TableLine handleCheckboxChange={props.handleCheckboxChange} checks={props.checks} key={entry.id+1} entry={entry} balance={saldo} onClick={props.onClick} />
            })}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TableCell colSpan={6}>Total</TableCell>
                <TableCell className="text-right">{saldo.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={6}>Checks</TableCell>
                <TableCell className="text-right">{vlcheck.toFixed(2)}</TableCell>
            </TableRow>
        </TableFooter>
        </Table>        
        </>
    )
}

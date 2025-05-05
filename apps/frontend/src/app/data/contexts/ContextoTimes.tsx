'use client'
import moment from "moment"
import { createContext, useEffect, useState } from 'react'
import { Entry } from '@/core/model/Entry' 
import { ICard } from "@/core/model/ICard"

export interface ContextoTimesProps {
    agora: string
    dia: number
    mes: number
    ano: number
    parcelas: number
    card: number
    ds_category: string
    category_id: number
    category_nm: string
    vl_entry: string
    entry: Partial<Entry> | null
    entries: Entry[]
    all_cards: ICard[]
    all_parcelas: ICard[]
    all_months: ICard[]
    all_years: ICard[]
    setDia: (dia: number) => void
    setMes: (mes: number) => void
    setAno: (ano: number) => void
    setParcelas: (parcelas: number) => void
    setCard: (card: number) => void
    setDsCategory: (ds_category: string) => void
    setCategoryId: (category_id: number) => void
    setCategoryNm: (category_nm: string) => void
    setVlEntry: (vl_entry: string) => void
    setEntry: (entry: Entry) => void
    setEntries: (entries: Entry[]) => void
    geraParcelas: () => void
}

const ContextoTimes = createContext<ContextoTimesProps>({} as any)

export function ProvedorTimes(props: any) {

    const [agora] = useState<string>("2024-11-01")
    const [dia, setDia] = useState(15)
    const [mes, setMes] = useState(10)
    const [ano, setAno] = useState(2025)
    const [parcelas, setParcelas] = useState(5)
    const [card, setCard] = useState(2)
    const [ds_category, setDsCategory] = useState('Teste')
    const [category_id, setCategoryId] = useState(1) 
    const [category_nm, setCategoryNm] = useState("Dummy")
    const [vl_entry, setVlEntry] = useState("500.00")
    const [entry, setEntry] = useState<Partial<Entry> | null>(null)
    const [entries, setEntries] = useState<Entry[]>([])

    const all_cards: ICard[] = [
        { id: 1, label: "Mastercard", value: "mastercard", dia: 15 },
        { id: 2, label: "Visa", value: "visa", dia: 8 },
        { id: 3, label: "Hering", value: "hering", dia: 5 },
        { id: 4, label: "Crédito", value: "credito", dia: 10 },
        { id: 5, label: "Débito", value: "debito", dia: 10  },
    ]

    const all_parcelas: ICard[] = [ 
        { id: 2, label: "2", value: "2", dia: 0 },
        { id: 3, label: "3", value: "3", dia: 0 },
        { id: 4, label: "4", value: "4", dia: 0 },
        { id: 5, label: "5", value: "5", dia: 0 },
        { id: 6, label: "6", value: "6", dia: 0 },
        { id: 7, label: "7", value: "7", dia: 0 },
        { id: 8, label: "8", value: "8", dia: 0 },
        { id: 9, label: "9", value: "9", dia: 0 },
        { id: 10, label: "10", value: "10", dia: 0 },
        { id: 11, label: "11", value: "11", dia: 0 },
        { id: 12, label: "12", value: "12", dia: 0 },
    ]

    const all_months: ICard[] = [
        { id: 1, label: "Janeiro", value: "1", dia: 0 },
        { id: 2, label: "Fevereiro", value: "2", dia: 0 },
        { id: 3, label: "Março", value: "3", dia: 0 },
        { id: 4, label: "Abril", value: "4", dia: 0 },
        { id: 5, label: "Maio", value: "5", dia: 0 },
        { id: 6, label: "Junho", value: "6", dia: 0 },
        { id: 7, label: "Julho", value: "7", dia: 0 },
        { id: 8, label: "Agosto", value: "8", dia: 0 },
        { id: 9, label: "Setembro", value: "9", dia: 0 },
        { id: 10, label: "Outubro", value: "10", dia: 0 },
        { id: 11, label: "Novembro", value: "11", dia: 0 },
        { id: 12, label: "Dezembro", value: "12", dia: 0 },
    ]

    const all_years: ICard[] = [
        { id: 2025, label: "2025", value: "2025", dia: 0 },
        { id: 2026, label: "2026", value: "2026", dia: 0 },
        { id: 2027, label: "2027", value: "2027", dia: 0 },
        { id: 2028, label: "2028", value: "2028", dia: 0 },
        { id: 2029, label: "2029", value: "2029", dia: 0 },
        { id: 2030, label: "2030", value: "2030", dia: 0 },
    ]

    const geraParcelas = () => {
        const temp: Entry[] = []
        let icont = 1
        let lano = ano
        let lmes = mes
        let ldia = dia
        let vl_parcela = parseFloat(vl_entry) / parcelas
        for (let i = 0; i < parcelas; i++) {
            if (lmes == 13) {
                lmes = 1
                lano += 1
            }
            const sano = lano.toString()
            const smes = lmes.toString()
            const sdia = ldia.toString()
            const item = geraParcela(icont, sano+"-"+smes+"-"+sdia, vl_parcela)
            temp.push(item) 
            lmes += 1
            icont += 1
        }
        setEntries(temp)
    }

    const geraParcela = (icont: number, dt_parcela: string, vl_parcela: number): Entry => {
        const dt_teste = new Date(dt_parcela)
        const description = ds_category + " ("+icont.toString()+" de "+parcelas.toString()+")"
        const ds_subcategory = all_cards[card-1].label
        const obj = {
            id: icont,
            category_id: category_id,
            ds_category: description,
            ds_subcategory: ds_subcategory,
            ds_detail: "", 
            dt_entry: moment(dt_teste, "YYYY-MM-DD").toISOString() as unknown as Date, 
            status: 1, 
            checked: 0, 
            fixed_costs: 0, 
            published: 1, 
            vl_entry: vl_parcela, 
            mysql_id: 0,
            nm_entry: "",
            category: {
                id: category_id,
                name: category_nm,
                vl_prev: 0.0, 
                day_prev: 0, 
                ordem: 0,
                type: "",
                published: 0,
                created_at: moment(new Date(), "YYYY-MM-DD").toISOString() as unknown as Date, 
                updated_at: moment(new Date(), "YYYY-MM-DD").toISOString() as unknown as Date
            },
            created_at: moment(new Date(), "YYYY-MM-DD").toISOString() as unknown as Date, 
            updated_at: moment(new Date(), "YYYY-MM-DD").toISOString() as unknown as Date
        }
        return obj
    }

    useEffect(() => {
        geraParcelas()
    }, [parcelas, dia, mes, ano, card, category_nm, ds_category])    

    return (
        <ContextoTimes.Provider
            value={{
                agora,
                dia,
                mes,
                ano,
                parcelas,
                card,
                ds_category,
                category_id,
                category_nm,
                vl_entry,
                entry,
                entries,
                all_cards,
                all_parcelas,
                all_months,
                all_years,
                setDia,
                setMes,
                setAno,
                setParcelas,
                setCard,
                setDsCategory,
                setCategoryId,
                setCategoryNm,
                setVlEntry,
                setEntry,
                setEntries,
                geraParcelas: () => geraParcelas()
            }}
        >
            {props.children}
        </ContextoTimes.Provider>
    )
    
}

export default ContextoTimes

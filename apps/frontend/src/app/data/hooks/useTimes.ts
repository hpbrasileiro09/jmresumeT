
import { ICard } from "@/core/model/ICard";
import { Time } from "@/core/model/Time";
import { useEffect, useState } from "react";

export default function useTimes() {

    const [day, setDay] = useState("15")
    const [month, setMonth] = useState("11")
    const [year, setYear] = useState("2024")
    const [card, setCard] = useState("visa")
    const [time, setTime] = useState("2")
    const [category_id, setCategoryId] = useState("1")
    const [ds_category, setDsCategory] = useState("Dummy")
    const [vl_entry, setVlEntry] = useState("120.0")
    const [vl_time, setVlTime] = useState("0.0")
    const [times, setTimes] = useState<Time[]>([])
    const [timesD, setTimesD] = useState<Time[]>([])
    const [vl_total, setVlTotal] = useState(0.0)

    const ptimes = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cards: ICard[] = [
        { id: 1, label: "Mastercard", value: "mastercard" },
        { id: 2, label: "Visa", value: "visa" },
        { id: 3, label: "Hering", value: "hering" },
        { id: 4, label: "Crédito", value: "credito" },
        { id: 5, label: "Débito", value: "debito" },
    ]

    const years = [ "2024", "2025", "2026", "2027" ]

    const months = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]

    const calc = () => {
        setVlTotal(timesD.reduce((resultado, item) => {
            return (resultado + item.vl_entry)
        }, 0.0))
    }

    const montaData = (pday: string, pmonth: string, pyear: string) => {
        const retorno = (pday.length <= 1 ? "0"+pday : pday) + "/" + (pmonth.length <= 1 ? "0"+pmonth : pmonth) + "/" + pyear
        return retorno
    }

    const fnInc1Dec2 = (id: number, action: number) => {
        timesD.forEach((item, index)=>{
           if (item.id == id) {
                if (action == 1) {
                    timesD[index].vl_entry += 0.01
                } else 
                    timesD[index].vl_entry -= 0.01
                calc()
           }
        })        
    }

    const roundTo2Decimals = (numberToRound: number) => {
        return Math.round(numberToRound * 100) / 100;
    };

    const copyTimes = () => {
        setTimesD(times)
    }

    useEffect(() => {
        const teste = <Time[]>[]
        const vl_parcela: number = roundTo2Decimals(parseFloat(vl_entry) / parseInt(time))
        const iday: number = parseInt(day)
        let imonth: number = parseInt(month)
        let iyear: number = parseInt(year)
        let label: string = ""
        setVlTime(vl_parcela.toFixed(2).toString())
        for (let x = 0; x < parseInt(time); x++) {
            label = ds_category + " (" + (x+1).toString() + " de " + time + ")"
            const item = {
                "id": x,
                "time": x+1,
                "dt_venc": montaData(iday.toString(), imonth.toString(), iyear.toString()),
                "ds_category": label,
                "card": card,
                "vl_entry": vl_parcela
            }
            teste.push(item)
            imonth += 1
            if (imonth > 12) {
                iyear += 1
                imonth = 1
            }
        }
        setTimes(teste)
    }, [time, card, vl_entry, day, month, year, ds_category])

    return {
        times,
        timesD,
        day, 
        month, 
        year, 
        card, 
        time, 
        category_id, 
        ds_category, 
        vl_entry, 
        vl_time, 
        ptimes, 
        cards,
        years,
        months,
        vl_total,
        calc,
        setDay,
        setMonth,
        setYear,
        setCard,
        setTime,
        setTimes,
        setTimesD,
        setCategoryId,
        setDsCategory,
        setVlEntry,
        setVlTime,
        setVlTotal,
        fnInc1Dec2,
        copyTimes
    }    

}
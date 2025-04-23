import { Time } from "@/core/model/Time"
import { useState } from "react"

export default function useTimesGrid() {

    const [times, setTimes] = useState<Time[]>([])

    const [vl_total, setVlTotal] = useState(0.0)

    const calc = () => {
        setVlTotal(times.reduce((resultado, item) => {
            return (resultado + item.vl_entry)
        }, 0.0))
    }

    return {
        calc,
        times,
        vl_total, 
        setVlTotal,
        setTimes,
    }    

}
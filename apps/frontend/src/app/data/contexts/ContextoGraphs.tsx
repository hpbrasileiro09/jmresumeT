'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { Graph0 } from '@/core/model/Graph0' 
import useAPI from '../hooks/useAPI' 

export interface ContextoGraphsProps {
    chartData: Graph0[]
}

const ContextoGraphs = createContext<ContextoGraphsProps>({} as any)

export function ProvedorGraphs(props: any) {

    const { httpGet } = useAPI()
    const [chartData, setChartData] = useState<Graph0[]>([])

    const carregarGraphs = useCallback(async () => {
        const registers = await httpGet('/entries/grafico/2025')
        setChartData(registers)
    }, [httpGet])

    useEffect(() => {
        carregarGraphs()
    }, [carregarGraphs])

    return (
        <ContextoGraphs.Provider
            value={{
                get chartData() {
                    return chartData
                },
            }}
        >
            {props.children}
        </ContextoGraphs.Provider>
    )
    
}

export default ContextoGraphs

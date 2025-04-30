'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { Category } from '@/core/model/Category' 
import { Graph0 } from '@/core/model/Graph0' 
import useAPI from '../hooks/useAPI' 

export interface ContextoReportProps {
    categoriesS: Graph0[]
    categoriesC: Category[]
    categoriesD: Category[]
}

const ContextoReport = createContext<ContextoReportProps>({} as any)

export function ProvedorReport(props: any) {

    const { httpGet } = useAPI()
    const [categoriesS, setCategoriesS] = useState<Graph0[]>([])
    const [categoriesC, setCategoriesC] = useState<Category[]>([])
    const [categoriesD, setCategoriesD] = useState<Category[]>([])

    const carregarCategories = useCallback(async () => {
        const categoriesS = await httpGet('/categories/temp/2025')
        const categoriesC = await httpGet('/categories/related/credit/2025')
        const categoriesD = await httpGet('/categories/related/debit/2025')
        setCategoriesS(categoriesS ?? [])
        setCategoriesC(categoriesC ?? [])
        setCategoriesD(categoriesD ?? [])
    }, [httpGet])

    useEffect(() => {
        carregarCategories()
    }, [carregarCategories])

    return (
        <ContextoReport.Provider
            value={{
                get categoriesS() {
                    return categoriesS
                },
                get categoriesC() {
                    return categoriesC
                },
                get categoriesD() {
                    return categoriesD
                },
            }}
        >
            {props.children}
        </ContextoReport.Provider>
    )
    
}

export default ContextoReport

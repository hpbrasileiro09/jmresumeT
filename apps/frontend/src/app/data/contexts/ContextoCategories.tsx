'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { Category } from '@/core/model/Category' 
import FiltrarCategories from '@/core/model/FiltrarCategories' 
import useAPI from '../hooks/useAPI' 

export interface ContextoCategoriesProps {
    categories: Category[]
    pesquisa: string
    setPesquisa: (pesquisa: string) => void
    entryPorId: (id: number) => Category | null
}

const ContextoCategories = createContext<ContextoCategoriesProps>({} as any)

export function ProvedorCategories(props: any) {

    const { httpGet } = useAPI()
    const [pesquisa, setPesquisa] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>([])

    const carregarCategories = useCallback(async () => {
        const categories = await httpGet('/categories')
        setCategories(categories ?? [])
    }, [httpGet])

    useEffect(() => {
        carregarCategories()
    }, [carregarCategories])

    return (
        <ContextoCategories.Provider
            value={{
                pesquisa,
                get categories() {
                    if (!pesquisa) return categories
                    return new FiltrarCategories().executar(pesquisa, categories)
                },
                setPesquisa,
                entryPorId: (id: number) =>
                    categories.find((category) => category.id === id) ?? null,
            }}
        >
            {props.children}
        </ContextoCategories.Provider>
    )
    
}

export default ContextoCategories

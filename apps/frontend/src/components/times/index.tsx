'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Calendar } from "lucide-react";
import { Category } from '@/core/model/Category';
import { useEffect } from "react";
import { Input } from "@/components/ui/input"

import TableList from './TableList'
import useTimes from "@/app/data/hooks/useTimesC";
import useEntries from "@/app/data/hooks/useEntries";
import useCategories from "@/app/data/hooks/useCategories";
import Combobox from '@/components/utils/combobox';
import Dropdown from '@/components/utils/dropdown';
import { Entry } from "@/core/model/Entry";
import { Label } from "../ui/label";
import { ICard } from "@/core/model/ICard";

export default function Page() {

    const { categories } = useCategories()
    const { create } = useEntries()

    const { 
      agora, 
      ano,
      mes,
      dia,
      parcelas,
      card,
      ds_category,
      category_id,
      category_nm,
      vl_entry,
      entries,
      all_cards,
      all_parcelas,
      all_months,
      all_years,
      setAno,
      setMes,
      setDia,
      setCategoryId,
      setCategoryNm,
      setVlEntry,
      setParcelas,
      setCard,
      setDsCategory,
      geraParcelas,
    } = useTimes()

    const handleParcelas = (value: number) => {
        setParcelas(value)
    }

    const handleCard = (value: number) => {
        const item = all_cards.find((el: ICard) => el.id === value)
        if (item) setDia(item.dia)
        setCard(value)
    }

    const handleAno = (value: number) => {
        setAno(value)
    }

    const handleMes = (value: number) => {
        setMes(value)
    }

    const handleDia = (value: string) => {
        setDia(parseInt(value))
    }

    const handleCategoryId = (value: number) => {
        setCategoryId(value)
    }

    const handleVlEntry = (value: string) => {
        setVlEntry(value)
    }
    
    const handleDsCategory = (value: string) => {
        setDsCategory(value)
    }

    const gravaParcelas = () => {
        console.log('gravaParcelas...')
        entries.map((entry: Entry) => {
            let etemp = {...entry}
            delete etemp.category
            create(etemp)
            console.log('createEntry...', etemp.id)
        })
    }

    useEffect(() => {
        const item = categories.find((category: Category) => category.id === category_id)
        setCategoryNm(item?.name || "Dummy")
    }, [category_id]); 

  return (
    <section className="grid grid-cols-3 lg:grid-cols-3 gap-4">
    <Card>
        <CardHeader>
        <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
            Times
            </CardTitle>
            <Calendar className="ml-auto" />
        </div>
        <CardDescription>
            Times
        </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-5">
                    <Dropdown 
                        drop_id={parcelas || 2}
                        drop_nm={"2"}
                        registers={all_parcelas}
                        label="Parcelas"
                        handleDropId={handleParcelas} />
                    <Dropdown 
                        drop_id={card || 2}
                        drop_nm={all_cards[card-1].label}
                        label="Cards"
                        registers={all_cards}
                        handleDropId={handleCard} />
                    <div className="flex items-center space-x-4">
                         <p className="text-sm text-muted-foreground">Dia</p>
                        <Input 
                            className="bg-zinc-800 text-zinc-100" 
                            type="number" 
                            id="dia" 
                            placeholder="Dia" 
                            value={dia}
                            onChange={(e) => handleDia(e.target.value)} />
                    </div>
                </div>  
                <div className="grid grid-cols-2 gap-5">
                    <Dropdown 
                            drop_id={ano || 2025}
                            drop_nm={"2025"}
                            registers={all_years}
                            label="Ano"
                            handleDropId={handleAno} />
                    <Dropdown 
                        drop_id={mes || 2}
                        drop_nm={"Fevereiro"}
                        label="Mês"
                        registers={all_months}
                        handleDropId={handleMes} />
                </div>  
                <div className="grid grid-cols-1 gap-5">
                    <Combobox 
                        category_id={category_id || 1}
                        category_nm={category_nm}
                        categories={categories}
                        label="Category"
                        handleCategoryId={handleCategoryId} />
                </div>  
                <div className="grid grid-cols-2 gap-5">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className="text-muted-foreground" htmlFor="ds_category">Description</Label>
                        <Input 
                            className="bg-zinc-800 text-zinc-100" 
                            type="text" 
                            id="ds_category" 
                            placeholder="Description" 
                            value={ds_category} 
                            onChange={(e) => handleDsCategory(e.target.value)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className="text-muted-foreground" htmlFor="vl_entry">Vl. Entry</Label>
                        <Input 
                            className="bg-zinc-800 text-zinc-100 text-right" 
                            type="text" 
                            id="vl_entry" 
                            placeholder="Vl. Entry" 
                            value={vl_entry}
                            onChange={(e) => handleVlEntry(e.target.value)} />
                    </div>
                </div>  
                <div className="grid grid-cols-3 gap-5">
                    <button className="bg-blue-500 px-4 py-2 rounded-md" onClick={geraParcelas}>Gera Parcelas</button> 
                </div>  
            </div>
        </CardContent>
    </Card>        
    <Card>
        <CardHeader>
        <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
            Times
            </CardTitle>
            <Calendar className="ml-auto" />
        </div>
        <CardDescription>
            Times
        </CardDescription>
        </CardHeader>
        <CardContent>
            <TableList entries={entries} now={agora} />
            <div className="grid grid-cols-3 gap-5">
                <button className="bg-green-500 px-4 py-2 rounded-md" onClick={gravaParcelas}>Grava Parcelas</button> 
            </div>  
        </CardContent>
    </Card>        
    </section>
  )

}

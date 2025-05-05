"use client"
import { ChartContainer } from "../ui/chart";
import { type ChartConfig, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Graph0 } from "@/core/model/Graph0";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export interface GraphProps {
    chartData: Graph0[]
}

export default function Graph(props: GraphProps) {

    const chartData = [
        { month: "Janeiro", debit: 186, credit: 180 },
        { month: "Fevereiro", debit: 305, credit: 200 },
        { month: "Março", debit: 237, credit: 120 },
        { month: "Abril", debit: 73, credit: 190 },
        { month: "Mail", debit: 209, credit: 130 },
        { month: "Junho", debit: 214, credit: 140 },
        { month: "Julho", debit: 214, credit: 140 },
        { month: "Agosto", debit: 214, credit: 140 },
        { month: "Setembro", debit: 214, credit: 140 },
        { month: "Outubro", debit: 214, credit: 140 },
        { month: "Novembro", debit: 214, credit: 140 },
        { month: "Dezembro", debit: 214, credit: 140 },
    ]

    const chartConfig = {
        debit: {
            label: "Débito",
            color: "#E74C3C",
        },
        credit: {
            label: "Crédito",
            color: "#229954",
        },
    } satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <BarChart data={props.chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                />                
                <Bar dataKey="debit" fill="var(--color-debit)" radius={4} />
                <Bar dataKey="credit" fill="var(--color-credit)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
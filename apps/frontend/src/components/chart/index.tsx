"use client"
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Graph from "./graph";

import useGraphs from "@/app/data/hooks/useGraphs";
import { Graph0 } from "@/core/model/Graph0";
  
export default function ChartOverview() {

    const { chartData } = useGraphs()

    return (
        <Card className="w-full md:w-1/2 md:max-w-[800px]">
            <CardHeader>
                <div className="flex items-center justify-center">
                    <CardTitle className="text-lg sm:text-xl text-gray-800">
                        Overview vendas
                    </CardTitle>
                    <DollarSign className="ml-auto w-4 h-4" />
                </div>
            </CardHeader>
            <CardContent>
                <Graph chartData={chartData} />
            </CardContent>
        </Card>
    )
}
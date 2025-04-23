'use client'

import useEntries from "@/app/data/hooks/useEntries";

import { Search } from "lucide-react"

export interface FiltroEntriesProps {
    className?: string
}

export default function FiltroEntries(props: FiltroEntriesProps) {
    const { pesquisa, setPesquisa } = useEntries()
    return (
        <div>
            <div
                className={`
                    flex gap-2 border border-white/20 mt-2
                    overflow-hidden ${props.className ?? ''}
                `}
            >
                <input
                    value={pesquisa ?? ''}
                    onChange={(e) => setPesquisa(e.target.value)}
                    placeholder="O que você procura?"
                    className="flex-1 bg-gray-300 outline-none px-6 py-2"
                />
            </div>
        </div>
    )
}

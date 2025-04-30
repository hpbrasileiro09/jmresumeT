
import { Mes } from '@/core/model/Mes'
import { Category } from '@/core/model/Category'
import { Graph0 } from '@/core/model/Graph0'
import TableLine from './TableLine'
import TableTotal from './TableTotal'

export interface TableListProps {
    tipo: number
    meses: Mes[]
    categories: Category[]
    categoriesS: Graph0[]
}

export default function TableList(props: TableListProps) {
    
    return (
        <>
            {props.categories.map((category: Category) => {
                return <TableLine tipo={props.tipo} key={(category.id)} category={category} meses={props.meses} />
            })}
            <TableTotal tipo={props.tipo} categoriesS={props.categoriesS} />
        </>
    )

}

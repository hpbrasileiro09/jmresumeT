'use client'

import { Category } from '@/core/model/Category'
import { Mes } from '@/core/model/Mes'

export interface MesesProps {
    meses: Mes[]
}

export default function Meses(props: MesesProps) {

  return (
    <>
      {props.meses.length &&
          props.meses.map((mes: Mes) => {
              return <div key={mes.id}>{mes.month}</div>
          })
      }
    </>
  )

}

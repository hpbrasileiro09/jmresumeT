import Backend from '@/backend'
import { Param } from '@/core/model/Param'
import { useEffect, useState } from 'react'

export default function useParams() {

    const [mensagem, setMensagem] = useState<string>('')
    const [params, setParams] = useState<Param[]>([])
    const [param, setParam] = useState<Partial<Param> | null>(null)

    useEffect(() => {
        Backend.params.all().then(setParams)
    }, [])

    async function save() {
        if (!param) return
        await Backend.params.upsert(param)
        const params = await Backend.params.all()
        setParams(params)
        setParam(null)
    }

    async function create() {
        if (!param) return
        await Backend.params.create(param)
        const params = await Backend.params.all()
        setParams(params)
        setParam(null)
    }

    async function remove() {
        if (!param || !param.id) return
        await Backend.params.delete(param.id)
        const params = await Backend.params.all()
        setParams(params)
        setParam(null)
    }

    return {
        params,
        param,
        setMensagem,
        save,
        create,
        remove,
        getMensagem: () => { return mensagem },
        cancel: () => setParam(null),
        createParam: (param: Partial<Param> | null) => setParam(param),
        updateParam: (param: Partial<Param> | null) => setParam(param) 
    }
}

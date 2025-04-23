
import { Param } from "./Param"

export default class FiltrarCategories {
    executar(pesquisa: string, item: Param[]): Param[] {
        const palavras = pesquisa.toLowerCase().split(' ')
        return item.filter((item) => {
            const texto = `
                ${item.label}
                ${item.value}
            `.toLowerCase()
            return palavras.every((palavra) => texto.includes(palavra))
        })
    }
}

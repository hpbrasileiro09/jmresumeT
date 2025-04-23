
import { Entry } from "./Entry"

export default class FiltrarEntries {
    executar(pesquisa: string, entry: Entry[]): Entry[] {
        const palavras = pesquisa.toLowerCase().split(' ')
        return entry.filter((entry) => {
            const texto = `
                ${entry.ds_category}
                ${entry.ds_subcategory}
            `.toLowerCase()
            return palavras.every((palavra) => texto.includes(palavra))
        })
    }
}

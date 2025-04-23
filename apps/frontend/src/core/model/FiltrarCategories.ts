
import { Category } from "./Category"

export default class FiltrarCategories {
    executar(pesquisa: string, item: Category[]): Category[] {
        const palavras = pesquisa.toLowerCase().split(' ')
        return item.filter((item) => {
            const texto = `
                ${item.name}
            `.toLowerCase()
            return palavras.every((palavra) => texto.includes(palavra))
        })
    }
}

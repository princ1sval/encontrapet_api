import { RelatorioData } from '../data/RelatorioData'

const relatorioData = new RelatorioData()

class BuscarRelatorioPorIdBusiness {

    async executar(idDoRelatorio: string) {

    //Verifica se o ID foi fornecido
    if (!idDoRelatorio) {
        throw new Error("ID do relatório não fornecido.")
    }

    //Busc o relatório
    const relatorio = await relatorioData.buscarPorId(idDoRelatorio)

    //Verifica se o relatório realmente existe
    if (!relatorio) {
        throw new Error("Relatório não encontrado.")
    }

    //Retorna o relatório
    return relatorio
    }
}

export { BuscarRelatorioPorIdBusiness }
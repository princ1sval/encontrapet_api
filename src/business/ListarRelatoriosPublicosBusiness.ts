import { RelatorioData } from '../data/RelatorioData'

const relatorioData = new RelatorioData()

class ListarRelatoriosPublicosBusiness {

    async executar() {
    //Chama a camada de dados para buscar os relatórios
    const relatorios = await relatorioData.listarPublicos()

    return relatorios
    }
}

export { ListarRelatoriosPublicosBusiness }
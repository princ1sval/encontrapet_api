import { RelatorioData, FiltrosRelatorio } from '../data/RelatorioData'

const relatorioData = new RelatorioData()

class ListarRelatoriosPublicosBusiness {

    async executar(filtros: FiltrosRelatorio) {

    const relatorios = await relatorioData.listarPublicos(filtros)

    return relatorios
    }
}

export { ListarRelatoriosPublicosBusiness }
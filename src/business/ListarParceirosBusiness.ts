import { ParceiroData } from '../data/ParceiroData'

const parceiroData = new ParceiroData()

class ListarParceirosBusiness {

    async executar() {
        // 1. Chama a camada de dados para buscar as ONGs
        const ongs = await parceiroData.listarTodos()
        // 2. Retorna a lista de ONGs
        return ongs
    }
}

export { ListarParceirosBusiness }
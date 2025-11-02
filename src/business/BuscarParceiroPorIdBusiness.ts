import { ParceiroData } from '../data/ParceiroData'

const parceiroData = new ParceiroData()

class BuscarParceiroPorIdBusiness {

    async executar(idDaOng: string) {
        // 1. Regra: Verificar se o ID da ONG foi fornecido
        if (!idDaOng) {
        throw new Error("ID da ONG não fornecido.")
        }
        // 2. Buscar a ONG pelo ID
        const ong = await parceiroData.buscarPorId(idDaOng)
        // 3. Regra: Verificar se a ONG existe
        if (!ong) {
        throw new Error("ONG não encontrada.")
        }
        return ong
    }
}

export { BuscarParceiroPorIdBusiness }
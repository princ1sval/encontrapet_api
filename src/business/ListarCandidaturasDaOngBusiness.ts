import { CandidaturaData } from '../data/CandidaturaData'

const candidaturaData = new CandidaturaData()

class ListarCandidaturasDaOngBusiness {

    async executar(idDaOng: string) {

    //Verifica se o ID da ONG foi fornecido
        if (!idDaOng) {
            throw new Error("ONG não identificada. Faça o login.")
        }

        // Chama a camada de dados para buscar as candidaturas
        const candidaturas = await candidaturaData.buscarPorOng(idDaOng)

        return candidaturas
    }
}

export { ListarCandidaturasDaOngBusiness }
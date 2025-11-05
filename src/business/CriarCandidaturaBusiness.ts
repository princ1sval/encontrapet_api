import { CandidaturaData, CandidaturaDTO } from '../data/CandidaturaData'
import { PetData } from '../data/PetData'

const candidaturaData = new CandidaturaData()
const petData = new PetData() // Instanciamos o PetData

interface DadosCandidatura {
    usuarioId: string;
    petId: string;
    }

    class CriarCandidaturaBusiness {

    async executar(dados: DadosCandidatura) {

        //Verifica se os IDs foram fornecidos
        if (!dados.usuarioId || !dados.petId) {
        throw new Error("Dados da candidatura incompletos.")
        }

        // Busca o pet para descobrir a ONG
        const pet = await petData.buscarPorId(dados.petId)

        // Verifica se o pet existe e se é de uma ONG
        if (!pet || !pet.Ong_ID) {
        throw new Error("Pet não encontrado ou não está disponível para adoção.")
        }

        //Se tudo estiver OK, temos os 3 IDs necessários
        const novaCandidatura = await candidaturaData.criar({
        usuarioId: dados.usuarioId,
        petId: dados.petId,
        ongId: pet.Ong_ID // Usamos o ID da ONG que encontramos no pet
        })

        return novaCandidatura
    }
}

export { CriarCandidaturaBusiness }
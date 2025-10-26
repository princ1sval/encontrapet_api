
import { PetData, PetDTO } from '../data/PetData'

const petData = new PetData()

class CriarPetBusiness {

    async executar(dados: PetDTO) {
        // 1. Regra: Verificar se os dados básicos foram enviados
        if (!dados.nome || !dados.especie || !dados.cor || !dados.dono_ID) {
        throw new Error("Dados incompletos: nome, espécie, cor e ID do dono são obrigatórios.")
        }
        // 2. Chama a camada de dados para criar o pet
        const novoPet = await petData.criar(dados)

        return novoPet
    }
}

export { CriarPetBusiness }
// src/business/AtualizarPetBusiness.ts
import { PetData, PetUpdateDTO } from '../data/PetData'

const petData = new PetData()

interface DadosAtualizaPet {
    idDoPet: string;
    idDoDono: string;
    dados: PetUpdateDTO;
}

class AtualizarPetBusiness {

    async executar({ idDoPet, idDoDono, dados }: DadosAtualizaPet) {

    // Verifica se os IDs foram fornecidos
    if (!idDoPet || !idDoDono) {
        throw new Error("Dados incompletos.")
    }

    // Busca o pet
    const pet = await petData.buscarPorId(idDoPet)
    if (!pet) {
        throw new Error("Pet não encontrado.")
    }

    //Regra de Segurança: Verificar se o pet pertence ao dono logado
    if (pet.dono_ID !== idDoDono) {
        throw new Error("Acesso negado. Este pet não pertence a você.")
    }

    //Envia para a camada de dados atualizar
    const petAtualizado = await petData.atualizar(idDoPet, dados)

    return petAtualizado
    }
}

export { AtualizarPetBusiness }
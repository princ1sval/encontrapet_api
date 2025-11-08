// src/business/DeletarPetBusiness.ts
import { PetData } from '../data/PetData'

const petData = new PetData()

interface DadosDeletarPet {
    idDoPet: string;
    idDoDono: string;
}

class DeletarPetBusiness {

    async executar({ idDoPet, idDoDono }: DadosDeletarPet) {

    //Verifica se os IDs foram fornecidos
    if (!idDoPet || !idDoDono) {
        throw new Error("Dados incompletos.")
    }

    //Buscar o pet
    const pet = await petData.buscarPorId(idDoPet)
    if (!pet) {
        throw new Error("Pet não encontrado.")
    }

    //Verifica se o pet pertence ao dono logado
    if (pet.dono_ID !== idDoDono) {
        throw new Error("Acesso negado. Você não pode deletar este pet.")
    }

    //Envia para a camada de dados deletar
    await petData.deletar(idDoPet)

    //Retorna uma mensagem de sucesso
        return { message: "Pet deletado com sucesso." }
    }
}

export { DeletarPetBusiness }
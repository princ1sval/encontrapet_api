// src/business/BuscarPetParaAdocaoBusiness.ts
import { PetData } from '../data/PetData'

const petData = new PetData()

class BuscarPetParaAdocaoBusiness {

    async executar(idDoPet: string) {

    if (!idDoPet) {
        throw new Error("ID do pet não fornecido.")
        }
        
        const pet = await petData.buscarPorId(idDoPet)
        
        if (!pet) {
        throw new Error("Pet não encontrado.")
        }

        if (!pet.Ong_ID) {
        throw new Error("Este pet não está disponível para adoção.")
        }

        return pet
    }
}

export { BuscarPetParaAdocaoBusiness }
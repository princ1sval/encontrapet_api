// src/business/ListarPetsParaAdocaoBusiness.ts
import { PetData } from '../data/PetData'

const petData = new PetData()

class ListarPetsParaAdocaoBusiness {

    async executar() {
    const petsParaAdocao = await petData.listarParaAdocao()

    return petsParaAdocao
    }
}

export { ListarPetsParaAdocaoBusiness }
// src/business/BuscarPetPorIdBusiness.ts
import { PetData } from '../data/PetData'

const petData = new PetData()

interface DadosBuscaPet {
    idDoPet: string;
    idDoDono: string;
}

class BuscarPetPorIdBusiness {

    async executar(dados: DadosBuscaPet) {
        if (!dados.idDoPet || !dados.idDoDono) {
            throw new Error("Dados incompletos.")
        }

        //Chama a camada de dados para buscar o pet
        const pet = await petData.buscarPorId(dados.idDoPet)

        //Regra: Verificar se o pet existe
        if (!pet) {
            throw new Error("Pet não encontrado.")
        }

        // 4. Regra de Segurança: Verificar se o pet pertence ao dono logado
        if (pet.dono_ID !== dados.idDoDono) {
            throw new Error("Acesso negado. Este pet não pertence a você.")
        }

        return pet
    }
}

export { BuscarPetPorIdBusiness }
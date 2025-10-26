import { PetData } from '../data/PetData'


const petData = new PetData()

class ListarPetsDoDonoBusiness {
    async executar(idDoDono: string) {
        // 1. Regra: Verificar se o ID do dono foi fornecido
        if (!idDoDono) {
        throw new Error("Usuário não identificado. Faça o login novamente.")
        }
        // 2. Chama a camada de dados para buscar os pets
        const pets = await petData.buscarPorDono(idDoDono)

        return pets
    }
}
export { ListarPetsDoDonoBusiness }
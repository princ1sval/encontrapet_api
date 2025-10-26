import { prisma } from '../bd'
interface PetDTO {
    nome: string;
    especie: string;
    raca?: string;
    cor: string;
    dono_ID: string; // O ID do usuário
    }

    class PetData {
    // Método para CRIAR um pet
    async criar(dados: PetDTO) {
        return await prisma.pet.create({
        data: {
            nome: dados.nome,
            especie: dados.especie,
            raca: dados.raca,
            cor: dados.cor,
            dono_ID: dados.dono_ID // Conecta o pet ao usuário dono
        }
        })
    }

    async buscarPorDono(idDoDono: string) {
    return await prisma.pet.findMany({
        where: {
            dono_ID: idDoDono
        }
        })
    }

  // (Futuramente, aqui pra baixo ficara as buscas por dono, busca por id do pet)
}

export { PetData, PetDTO }
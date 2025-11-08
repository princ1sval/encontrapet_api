import { prisma } from '../bd'
interface PetDTO {
    nome: string;
    especie: string;
    raca?: string;
    cor: string;
    dono_ID?: string; // O ID do usuário
    Ong_ID?: string;  // ID da ONG (opcional)
}

interface PetUpdateDTO {
    nome?: string;
    especie?: string;
    raca?: string;
    cor?: string;
}

    class PetData {
    async criar(dados: PetDTO) {
        return await prisma.pet.create({
        data: {
            nome: dados.nome,
            especie: dados.especie,
            raca: dados.raca,
            cor: dados.cor,
            dono_ID: dados.dono_ID,
            Ong_ID: dados.Ong_ID 
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

    async listarParaAdocao() {
    return await prisma.pet.findMany({
        where: {
            // Filtra onde o Ong_ID NÃO É nulo
            Ong_ID: {
            not: null
            }
        }
        })
    }

    async buscarPorId(id: string) {
    return await prisma.pet.findUnique({
    where: { id }
        })
    }

    async atualizar(id: string, dados: PetUpdateDTO) {
    return await prisma.pet.update({
        where: { id },
        data: dados // O Prisma só atualiza os campos que forem enviados
        })
    }

    async deletar(id: string) {
    return await prisma.pet.delete({
        where: { id }
        })
    }
    
}

export { PetData, PetDTO, PetUpdateDTO }
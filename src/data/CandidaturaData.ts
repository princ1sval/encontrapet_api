import { prisma } from '../bd'

// Tipo de dados para criar uma candidatura
interface CandidaturaDTO {
    usuarioId: string;
    petId: string;
    ongId: string;
    }

    class CandidaturaData {

    // Método para CRIAR uma candidatura
    async criar(dados: CandidaturaDTO) {
        return await prisma.candidatura.create({
        data: {
            Usuario_ID: dados.usuarioId,
            Pet_ID: dados.petId,
            ONG_ID: dados.ongId,
        }
        })
    }

    async buscarPorOng(idDaOng: string) {
    return await prisma.candidatura.findMany({
        where: {
            ONG_ID: idDaOng
        },
        include: {
            usuario: { // Traz os dados do usuário
            select: { nome: true, email: true, telefone: true } // Seleciona só o que a ONG pode ver
            }, 
            pet: { // Traz os dados do pet
            select: { nome: true, especie: true, raca: true }
            }
        }
        })
    }
}

export { CandidaturaData, CandidaturaDTO }
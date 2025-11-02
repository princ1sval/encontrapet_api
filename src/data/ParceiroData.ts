import { prisma } from '../bd'


interface ParceiroDTO {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    }

    class ParceiroData {
    async buscarPorEmail(email: string) {
        return await prisma.oNG.findUnique({
        where: { email }
        })
    }

    async criar(dados: ParceiroDTO) {
        return await prisma.oNG.create({
        data: {
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone,
            endereco: dados.endereco,
        }
        })
    }
}

export { ParceiroData, ParceiroDTO }
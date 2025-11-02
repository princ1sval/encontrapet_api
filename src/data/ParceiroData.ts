import { prisma } from '../bd'


interface ParceiroDTO {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

interface ParceiroUpdateDTO {
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
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

    async listarTodos() {
    return await prisma.oNG.findMany()
    }

    async buscarPorId(id: string) {
    return await prisma.oNG.findUnique({
        where: { id }
        })
    }

    async atualizar(id: string, dados: ParceiroUpdateDTO) {
    return await prisma.oNG.update({
        where: { id },
        data: dados // O Prismae atualiza os campos que você enviar
        })
    }


}




export { ParceiroData, ParceiroDTO, ParceiroUpdateDTO }
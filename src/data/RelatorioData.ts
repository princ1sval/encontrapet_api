import { prisma } from '../bd'

interface RelatorioDTO {
    tipo: 'perdido' | 'encontrado' | 'avistado';
    localizacao: string;
    descricao: string;
    petId: string;
}

class RelatorioData {
    async criar(dados: RelatorioDTO) {
    return await prisma.relatorio.create({
        data: {
        tipo: dados.tipo,
        localizacao: dados.localizacao,
        descricao: dados.descricao,
        Pet_ID: dados.petId // Conecta o relatório ao pet
        }
    })
    }

    async listarPublicos() {
    return await prisma.relatorio.findMany({
      // Vamos incluir os dados do pet em cada relatório
        include: {
            pet: true
    },
      // Ordena pelos mais recentes primeiro
        orderBy: {
            data_relato: 'desc'
        }
    })
    }

    async buscarPorId(id: string) {
    return await prisma.relatorio.findUnique({
        where: { id },
        include: {
        pet: true
        }
    })
    }

}

export { RelatorioData, RelatorioDTO }
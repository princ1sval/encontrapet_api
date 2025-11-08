import { prisma } from '../bd'

// Tipo de dados para criar um Relatório
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
}

export { RelatorioData, RelatorioDTO }
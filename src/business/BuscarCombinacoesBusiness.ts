import { RelatorioData } from '../data/RelatorioData'

const relatorioData = new RelatorioData()

interface DadosBuscaCombinacoes {
    idDoRelatorio: string;
    idDoUsuarioLogado: string;
}

class BuscarCombinacoesBusiness {

    async executar(dados: DadosBuscaCombinacoes) {

        //Verifica se os IDs foram fornecidos
        if (!dados.idDoRelatorio || !dados.idDoUsuarioLogado) {
        throw new Error("Dados incompletos.")
        }

        //Busca o relatório original (o "perdido")
        const relatorioPerdido = await relatorioData.buscarPorId(dados.idDoRelatorio)
        if (!relatorioPerdido) {
        throw new Error("Relatório de pet perdido não encontrado.")
        }

        //Verifica se o usuário é o dono do pet perdido
        if (relatorioPerdido.pet.dono_ID !== dados.idDoUsuarioLogado) {
        throw new Error("Acesso negado. Você só pode buscar combinações para seus próprios pets.")
        }

        //Envia para a camada de dados buscar as combinações
        const combinacoes = await relatorioData.buscarCombinacoes(relatorioPerdido)

        return combinacoes
    }
}

export { BuscarCombinacoesBusiness }
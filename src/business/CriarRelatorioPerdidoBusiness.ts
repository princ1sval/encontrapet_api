
import { RelatorioData } from '../data/RelatorioData'
import { PetData } from '../data/PetData'

const relatorioData = new RelatorioData()
const petData = new PetData()

interface DadosRelatorioPerdido {
    idDoUsuarioLogado: string;
    idDoPet: string;
    latitude: number;    
    longitude: number;
    descricao: string;
}

class CriarRelatorioPerdidoBusiness {

    async executar(dados: DadosRelatorioPerdido) {

    //Verifica se os IDs foram fornecidos
    if (!dados.idDoPet || !dados.idDoUsuarioLogado || !dados.latitude || !dados.longitude) {
        throw new Error("Dados incompletos.")
    }

    //Busca o pet
    const pet = await petData.buscarPorId(dados.idDoPet)
    if (!pet) {
        throw new Error("Pet não encontrado.")
    }

    //Regra de Segurança: Verifica se o pet pertence ao dono logado
    if (pet.dono_ID !== dados.idDoUsuarioLogado) {
        throw new Error("Acesso negado. Você só pode reportar seus próprios pets.")
    }

    //Envia para a camada de dados criar o relatório
    const novoRelatorio = await relatorioData.criar({
        tipo: 'perdido',
        latitude: dados.latitude,
        longitude: dados.longitude,
        descricao: dados.descricao,
        petId: dados.idDoPet
    })

    return novoRelatorio
    }
}

export { CriarRelatorioPerdidoBusiness }
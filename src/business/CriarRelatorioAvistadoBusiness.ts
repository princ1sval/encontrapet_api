import { RelatorioData } from '../data/RelatorioData'
import { PetData } from '../data/PetData'

const relatorioData = new RelatorioData()
const petData = new PetData()

interface DadosRelatorioAvistado {
  // Dados do Pet
    nome: string;
    especie: string;
    raca?: string;
    cor: string;
    latitude: number;   
    longitude: number;
    descricao: string;
}

class CriarRelatorioAvistadoBusiness {

    async executar(dados: DadosRelatorioAvistado) {

    //Valida dados básicos
    if (!dados.especie || !dados.latitude || !dados.longitude) {
        throw new Error("Dados incompletos: Espécie e localização são obrigatórios.")
    }

    // Cria o novo Pet no banco
    // (Ele não terá dono_ID nem Ong_ID)
    const novoPet = await petData.criar({
        nome: dados.nome || "Animal avistado",
        especie: dados.especie,
        raca: dados.raca,
        cor: dados.cor
    })

    // Cria o Relatório e ligar ao pet recém-criado
    const novoRelatorio = await relatorioData.criar({
        tipo: 'avistado',
        latitude: dados.latitude, 
        longitude: dados.longitude,
        descricao: dados.descricao,
        petId: novoPet.id
    })

    return { novoRelatorio, novoPet }
    }
}

export { CriarRelatorioAvistadoBusiness }
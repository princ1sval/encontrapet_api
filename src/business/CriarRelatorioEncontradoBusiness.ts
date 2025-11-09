import { RelatorioData } from '../data/RelatorioData'
import { PetData } from '../data/PetData'

const relatorioData = new RelatorioData()
const petData = new PetData()

interface DadosRelatorioEncontrado {
  // Dados do Pet
    nome: string;
    especie: string;
    raca?: string;
    cor: string;
    // Dados do Relatório
    latitude: number;  
    longitude: number;
    descricao: string;
}

class CriarRelatorioEncontradoBusiness {

    async executar(dados: DadosRelatorioEncontrado) {

    // Valida dados básicos
    if (!dados.nome || !dados.especie || !dados.latitude || !dados.longitude) {
        throw new Error("Dados incompletos: Nome (provisório), espécie e localização são obrigatórios.")
    }

    //Cria o novo Pet no banco
    //(Ele não terá dono_ID nem Ong_ID)
    const novoPet = await petData.criar({
        nome: dados.nome,
        especie: dados.especie,
        raca: dados.raca,
        cor: dados.cor
    })

    //Cria o Relatório e ligar ao pet recém-criado
    const novoRelatorio = await relatorioData.criar({
        tipo: 'encontrado',
        latitude: dados.latitude,    
        longitude: dados.longitude,
        descricao: dados.descricao,
        petId: novoPet.id 
    })

    // Retorna o relatório e o pet
    return { novoRelatorio, novoPet }
  }
}

export { CriarRelatorioEncontradoBusiness }
// src/business/OngCadastraPetBusiness.ts
import { PetData, PetDTO } from '../data/PetData'

const petData = new PetData()

// Interface para os dados que chegam do Controller
interface DadosPetOng {
    idDaOng: string;
    nome: string;
    especie: string;
    raca?: string;
    cor: string;
  // Adicione aqui outros campos do Módulo 6, como 'historia', 'status_saude'
}

class OngCadastraPetBusiness {

    async executar(dados: DadosPetOng) {
    // 1. Regra: Verificar se os dados básicos foram enviados
        if (!dados.nome || !dados.especie || !dados.cor || !dados.idDaOng) {
        throw new Error("Dados incompletos: nome, espécie, cor e ID da ONG são obrigatórios.")
    }

    // 2. Chama a camada de dados para criar o pet, associando-o à ONG
    const novoPet = await petData.criar({
        nome: dados.nome,
        especie: dados.especie,
        raca: dados.raca,
        cor: dados.cor,
        Ong_ID: dados.idDaOng // Passa o ID da ONG
    })

    return novoPet
    }
}

export { OngCadastraPetBusiness }
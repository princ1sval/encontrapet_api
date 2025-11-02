import { ParceiroData, ParceiroUpdateDTO } from '../data/ParceiroData'

const parceiroData = new ParceiroData()

class AtualizarParceiroBusiness {

    async executar(idDaOng: string, dados: ParceiroUpdateDTO) {

    // 1. Regra: Verificar se o ID da ONG foi fornecido
    if (!idDaOng) {
        throw new Error("ONG não identificada. Faça o login.")
        }

        // 2. Regra: Verificar se a ONG existe (opcional, mas bom)
        const ongExiste = await parceiroData.buscarPorId(idDaOng)
        if (!ongExiste) {
        throw new Error("ONG não encontrada.")
        }

        // 3. Regra: Se a ONG enviou um novo email, verificar se ele já está em uso
        if (dados.email) {
        const emailJaExiste = await parceiroData.buscarPorEmail(dados.email)
        // Verifica se o email existe E pertence a uma ONG *diferente* da atual
        if (emailJaExiste && emailJaExiste.id !== idDaOng) {
            throw new Error("Este e-mail já está em uso por outra ONG.")
        }
    }

    // 4. Envia para a camada de dados atualizar
    const ongAtualizada = await parceiroData.atualizar(idDaOng, dados)
    return ongAtualizada
    }
}

export { AtualizarParceiroBusiness }
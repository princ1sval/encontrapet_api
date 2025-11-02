import { ParceiroData, ParceiroDTO } from '../data/ParceiroData'

const parceiroData = new ParceiroData()

class CriarParceiroBusiness {

    async executar(dados: ParceiroDTO) {
        // 1. Regra: Verificar se os dados básicos foram enviados
        if (!dados.nome || !dados.email || !dados.telefone || !dados.endereco) {
        throw new Error("Dados incompletos: nome, email, telefone e endereço são obrigatórios.")
        }
        // 2. Regra: Verificar se o email já existe
        const emailJaExiste = await parceiroData.buscarPorEmail(dados.email)
        if (emailJaExiste) {
        throw new Error("Este e-mail já está em uso por outra ONG.")
        }
        // 3. Chama a camada de dados para criar a ONG
        const novaOng = await parceiroData.criar(dados)

        return novaOng
    }
}

export { CriarParceiroBusiness }
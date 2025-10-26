import { UsuarioData, UsuarioDTO } from '../data/UsuarioData'


const usuarioData = new UsuarioData()

class CriarUsuarioBusiness {
    async executar(dados: UsuarioDTO) {
        // 1. Regra de Negócio: Verificar se o email já existe 
        const emailJaExiste = await usuarioData.buscarPorEmail(dados.email)
        if (emailJaExiste) {
        // Se o email existir, joga um erro para o Controller
        throw new Error("Este e-mail já está em uso.")
        }
        // 2. Se estiver tudo OK, chama a camada de dados para criar
        const novoUsuario = await usuarioData.criar(dados)
        return novoUsuario
        // Não criei a regra para nome, pois pessoas podem ter nome iguais
    }
}

export { CriarUsuarioBusiness }
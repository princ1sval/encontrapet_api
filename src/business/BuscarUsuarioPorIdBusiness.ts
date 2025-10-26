import { UsuarioData } from '../data/UsuarioData'

const usuarioData = new UsuarioData()

class BuscarUsuarioPorIdBusiness {

    async executar(idDoUsuario: string) {
        // 1. Regra: Verificar se o ID foi fornecido
        if (!idDoUsuario) {
        throw new Error("Usuário não identificado. Faça o login novamente.")
        }
        // 2. Regra: Buscar o usuário
        const usuario = await usuarioData.buscarPorId(idDoUsuario)
        // 3. Regra: Verificar se o usuário realmente existe
        if (!usuario) {
        throw new Error("Usuário não encontrado.")
        }
        // 4. Regra de Segurança: Não retornar a senha
        const { senha, ...usuarioSemSenha } = usuario
        // 5. Retorna o usuário (sem a senha)
        return usuarioSemSenha
    }
}

export { BuscarUsuarioPorIdBusiness }
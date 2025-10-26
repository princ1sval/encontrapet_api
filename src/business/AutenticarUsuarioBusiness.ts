import { UsuarioData } from '../data/UsuarioData'

const usuarioData = new UsuarioData()

interface AutenticacaoDTO {
    email: string;
    senha: string;
    }

    class AutenticarUsuarioBusiness {
    async executar({ email, senha }: AutenticacaoDTO) {
        // 1. Regra: Buscar o usuário pelo e-mail
        const usuario = await usuarioData.buscarPorEmail(email)
        // 2. Regra: Verificar se o usuário existe
        if (!usuario) {
        throw new Error("E-mail ou senha inválidos.")
        }
        // 3. Regra: Verificar se a senha está correta
        if (usuario.senha !== senha) {
        throw new Error("E-mail ou senha inválidos.")
        }

        // 4. Se tudo deu certo, retorna apenas o ID do usuário.
        return { idDoUsuario: usuario.id }
    }
}
export { AutenticarUsuarioBusiness }
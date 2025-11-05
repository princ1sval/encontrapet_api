import { UsuarioData, UsuarioUpdateDTO } from '../data/UsuarioData'

const usuarioData = new UsuarioData()

class AtualizarUsuarioBusiness {

    async executar(idDoUsuario: string, dados: UsuarioUpdateDTO) {

    //Verifica se o ID do usuário foi fornecido
    if (!idDoUsuario) {
        throw new Error("Usuário não identificado. Faça o login.")
        }

        //Verifica se o usuário existe
        const usuarioExiste = await usuarioData.buscarPorId(idDoUsuario)
        if (!usuarioExiste) {
        throw new Error("Usuário não encontrado.")
        }

        //Se o usuário está tentando mudar o e-mail...
        if (dados.email) {
        // verificar se esse novo e-mail já está em uso por OUTRA pessoa
        const emailJaExiste = await usuarioData.buscarPorEmail(dados.email)

        // Se o email foi encontrado E o ID dele é DIFERENTE do ID do usuário logado
        if (emailJaExiste && emailJaExiste.id !== idDoUsuario) {
            throw new Error("Este e-mail já está em uso por outro usuário.")
        }
        }

        //Envia para a camada de dados atualizar
        const usuarioAtualizado = await usuarioData.atualizar(idDoUsuario, dados)

        //Remove a senha da resposta
        const { senha, ...usuarioSemSenha } = usuarioAtualizado

        return usuarioSemSenha
    }
}

export { AtualizarUsuarioBusiness }
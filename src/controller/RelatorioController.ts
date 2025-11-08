import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarRelatorioPerdidoBusiness } from '../business/CriarRelatorioPerdidoBusiness'

const criarRelatorioPerdidoBusiness = new CriarRelatorioPerdidoBusiness()

class RelatorioController {

  //Método para criar um relatório de pet PERDIDO
    async criarPerdido(request: FastifyRequest, reply: FastifyReply) {

    try {
      //Pega o ID do usuário logado (dono) do cabeçalho
        const idDoUsuario = request.headers.authorization

      //Pega os dados do relatório do corpo da requisição
        const { idDoPet, localizacao, descricao } = request.body as any

      //Envia para a camada de negócio
        const novoRelatorio = await criarRelatorioPerdidoBusiness.executar({
            idDoUsuarioLogado: idDoUsuario as string,
            idDoPet: idDoPet,
            localizacao: localizacao,
            descricao: descricao
        })

      //Retorna 201 (Criado) com o novo relatório
        return reply.status(201).send(novoRelatorio)

    } catch (error: any) {
        return reply.status(error.message.includes("Acesso negado") ? 401 : 400).send({ error: error.message })
    }
        }
}

export { RelatorioController }
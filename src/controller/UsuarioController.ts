import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarUsuarioBusiness } from '../business/CriarUsuarioBusiness'
import { UsuarioDTO } from '../data/UsuarioData'
import { AutenticarUsuarioBusiness } from '../business/AutenticarUsuarioBusiness'
import { BuscarUsuarioPorIdBusiness } from '../business/BuscarUsuarioPorIdBusiness'

const criarUsuarioBusiness = new CriarUsuarioBusiness()
const autenticarUsuarioBusiness = new AutenticarUsuarioBusiness()
const buscarUsuarioPorIdBusiness = new BuscarUsuarioPorIdBusiness()

class UsuarioController {
  async criar(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Pega os dados do corpo da requisição (o JSON do Postman)
      const dadosDoUsuario = request.body as UsuarioDTO
      // 2. Envia os dados para a camada de Negócio executar
      const novoUsuario = await criarUsuarioBusiness.executar(dadosDoUsuario)
      // 3. Retorna 201 (Criado) com o usuário que acabou de ser criado
      return reply.status(201).send(novoUsuario)
    } catch (error: any) {
      // Se der um erro (ex: email duplicado), retorna 400 (Bad Request)
      return reply.status(400).send({ error: error.message })
    }
  }
  async autenticar(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Pega email e senha do corpo da requisição
      const { email, senha } = request.body as any
      // 2. Envia para a camada de negócio executar
      const { idDoUsuario } = await autenticarUsuarioBusiness.executar({ email, senha })
      // 3. Retorna 200 (OK) com o ID do usuário
      return reply.status(200).send({ idDoUsuario })
    } catch (error: any) {
      // Se der erro (email não existe, senha errada), retorna 401 (Não Autorizado)
      return reply.status(401).send({ error: error.message })
    }
  } 
  async buscarPerfil(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Pega o ID do usuário do cabeçalho 'authorization'
      const idDoUsuario = request.headers.authorization
      // 2. Envia para a camada de negócio executar
      const usuario = await buscarUsuarioPorIdBusiness.executar(idDoUsuario as string)
      // 3. Retorna 200 (OK) com os dados do perfil
      return reply.status(200).send(usuario)
      } catch (error: any) {
      // 401 = Não autorizado (não enviou o ID)
      // 404 = Não encontrado (ID não existe no banco)
      return reply.status(error.message.includes("identificado") ? 401 : 404).send({ error: error.message })
    }
  }
}

export { UsuarioController }
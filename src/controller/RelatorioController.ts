import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarRelatorioPerdidoBusiness } from '../business/CriarRelatorioPerdidoBusiness'
import { CriarRelatorioEncontradoBusiness } from '../business/CriarRelatorioEncontradoBusiness'
import { CriarRelatorioAvistadoBusiness } from '../business/CriarRelatorioAvistadoBusiness'
import { ListarRelatoriosPublicosBusiness } from '../business/ListarRelatoriosPublicosBusiness'
import { BuscarRelatorioPorIdBusiness } from '../business/BuscarRelatorioPorIdBusiness'
import { BuscarCombinacoesBusiness } from '../business/BuscarCombinacoesBusiness'

const criarRelatorioPerdidoBusiness = new CriarRelatorioPerdidoBusiness()
const criarRelatorioEncontradoBusiness = new CriarRelatorioEncontradoBusiness()
const criarRelatorioAvistadoBusiness = new CriarRelatorioAvistadoBusiness()
const listarRelatoriosPublicosBusiness = new ListarRelatoriosPublicosBusiness()
const buscarRelatorioPorIdBusiness = new BuscarRelatorioPorIdBusiness()
const buscarCombinacoesBusiness = new BuscarCombinacoesBusiness()
class RelatorioController {

  //Método para criar um relatório de pet PERDIDO
    async criarPerdido(request: FastifyRequest, reply: FastifyReply) {

    try {
      //Pega o ID do usuário logado (dono) do cabeçalho
        const idDoUsuario = request.headers.authorization

      //Pega os dados do relatório do corpo da requisição
        const { idDoPet, latitude, longitude, descricao } = request.body as any

      //Envia para a camada de negócio
        const novoRelatorio = await criarRelatorioPerdidoBusiness.executar({
            idDoUsuarioLogado: idDoUsuario as string,
            idDoPet: idDoPet,
            latitude,
            longitude,
            descricao: descricao
        })

      //Retorna 201 (Criado) com o novo relatório
        return reply.status(201).send(novoRelatorio)

    } catch (error: any) {
        return reply.status(error.message.includes("Acesso negado") ? 401 : 400).send({ error: error.message })
    }
    }

    async criarEncontrado(request: FastifyRequest, reply: FastifyReply) {
    try {
      const dados = request.body as any

      const { novoRelatorio, novoPet } = await criarRelatorioEncontradoBusiness.executar(dados)
      
      return reply.status(201).send({ novoRelatorio, novoPet })

    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
    }
    
    async criarAvistado(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Pega os dados do corpo (JSON do Postman)
      const dados = request.body as any

      //Envia para a camada de negócio
      const { novoRelatorio, novoPet } = await criarRelatorioAvistadoBusiness.executar(dados)

      return reply.status(201).send({ novoRelatorio, novoPet })

    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
    }

    async listarPublicos(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { latitude, longitude, raio_km } = request.query as any

      const listaDeRelatorios = await listarRelatoriosPublicosBusiness.executar({
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
        raio_km: raio_km ? Number(raio_km) : undefined
      })

      return reply.status(200).send(listaDeRelatorios)

    } catch (error: any) {
      return reply.status(500).send({ error: "Erro interno no servidor." })
    }
  }
    
    async buscarPorId(request: FastifyRequest, reply: FastifyReply) {
    try {
      //Pega o ID do relatório dos parâmetros da URL
      const { idDoRelatorio } = request.params as { idDoRelatorio: string }

      //Envia para a camada de negócio executar
      const relatorio = await buscarRelatorioPorIdBusiness.executar(idDoRelatorio)

      //Retorna 200 (OK) com os dados do relatório
      return reply.status(200).send(relatorio)

    } catch (error: any) {
      return reply.status(404).send({ error: error.message })
    }
  }

  async buscarCombinacoes(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Pega o ID do usuário logado (dono) do cabeçalho
      const idDoUsuario = request.headers.authorization

      // 2. Pega o ID do relatório (perdido) dos parâmetros da URL
      const { idDoRelatorio } = request.params as { idDoRelatorio: string }

      // 3. Envia para a camada de negócio executar
      const combinacoes = await buscarCombinacoesBusiness.executar({
        idDoRelatorio: idDoRelatorio,
        idDoUsuarioLogado: idDoUsuario as string
      })

      // 4. Retorna 200 (OK) com a lista de combinações
      return reply.status(200).send(combinacoes)

    } catch (error: any) {
      return reply.status(error.message.includes("Acesso negado") ? 401 : 400).send({ error: error.message })
    }
  }
}

export { RelatorioController }
import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarParceiroBusiness } from '../business/CriarParceiroBusiness'
import { ParceiroDTO } from '../data/ParceiroData'
import { ListarParceirosBusiness } from '../business/ListarParceirosBusiness'
import { BuscarParceiroPorIdBusiness } from '../business/BuscarParceiroPorIdBusiness'
import { ParceiroUpdateDTO } from '../data/ParceiroData'
import { AtualizarParceiroBusiness } from '../business/AtualizarParceiroBusiness'
import { OngCadastraPetBusiness } from '../business/OngCadastraPetBusiness'


const criarParceiroBusiness = new CriarParceiroBusiness()
const listarParceirosBusiness = new ListarParceirosBusiness()
const buscarParceiroPorIdBusiness = new BuscarParceiroPorIdBusiness()
const atualizarParceiroBusiness = new AtualizarParceiroBusiness()
const ongCadastraPetBusiness = new OngCadastraPetBusiness()


class ParceiroController {
  async criar(request: FastifyRequest, reply: FastifyReply) {

        try {
        // 1. Pega os dados do corpo da requisição (o JSON do Postman)
        const dadosDaOng = request.body as ParceiroDTO

        // 2. Envia os dados para a camada de Negócio executar
        const novaOng = await criarParceiroBusiness.executar(dadosDaOng)

        // 3. Retorna 201 (Criado) com os dados da ONG que foi criada
        return reply.status(201).send(novaOng)

        } catch (error: any) {
        // Se der um erro (dados faltando, email duplicado), retorna 400
        return reply.status(400).send({ error: error.message })
        }
  }
    
  async listar(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Chama a camada de negócio para listar as ONGs
      const listaDeOngs = await listarParceirosBusiness.executar()

      // 2. Retorna 200 com a lista de ONGs
      return reply.status(200).send(listaDeOngs)

    } catch (error: any) {
      // Se der um erro inesperado, retorna 500 
      return reply.status(500).send({ error: "Erro interno no servidor." })
    }
  }
    
  async buscarPorId(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { idDoParceiro } = request.params as { idDoParceiro: string }
      const ong = await buscarParceiroPorIdBusiness.executar(idDoParceiro)
      return reply.status(200).send(ong)
    } catch (error: any) {
      return reply.status(404).send({ error: error.message })
    }
  }

  async atualizarPerfil(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Pega o ID da ONG do cabeçalho 'authorization'
      const idDaOng = request.headers.authorization

      const dados = request.body as ParceiroUpdateDTO

      const ongAtualizada = await atualizarParceiroBusiness.executar(idDaOng as string, dados)
      // 4. Retorna 200 com os dados atualizados
      return reply.status(200).send(ongAtualizada)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  async cadastrarPet(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Pega o ID da ONG do cabeçalho 'authorization'
      const idDaOng = request.headers.authorization
      // 2. Pega os dados do corpo da requisição
      const { nome, especie, raca, cor } = request.body as any
      // 3. Chama a camada de negócio para cadastrar o pet
      const novoPet = await ongCadastraPetBusiness.executar({
        idDaOng: idDaOng as string,
        nome,
        especie,
        raca,
        cor
      })

      return reply.status(201).send(novoPet)
      } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }
}

export { ParceiroController }
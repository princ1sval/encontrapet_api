import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarPetBusiness } from '../business/CriarPetBusiness'
import { ListarPetsDoDonoBusiness } from '../business/ListarPetsDoDonoBusiness'
import { BuscarPetPorIdBusiness } from '../business/BuscarPetPorIdBusiness'
import { PetUpdateDTO } from '../data/PetData'
import { AtualizarPetBusiness } from '../business/AtualizarPetBusiness'
import { DeletarPetBusiness } from '../business/DeletarPetBusiness'

const criarPetBusiness = new CriarPetBusiness()
const listarPetsDoDonoBusiness = new ListarPetsDoDonoBusiness()
const buscarPetPorIdBusiness = new BuscarPetPorIdBusiness()
const atualizarPetBusiness = new AtualizarPetBusiness()
const deletarPetBusiness = new DeletarPetBusiness()

class PetController {

  async criar(request: FastifyRequest, reply: FastifyReply) {

        try {
        // 1. Pega o ID do dono (usuário logado) do cabeçalho
        const idDoDono = request.headers.authorization

        if (!idDoDono) {
            throw new Error("Usuário não identificado.")
        }

        // 2. Pega os dados do pet do corpo da requisição
        const { nome, especie, raca, cor } = request.body as any

        // 3. Junta tudo e envia para a camada de negócio
        const novoPet = await criarPetBusiness.executar({
            nome,
            especie,
            raca,
            cor,
            dono_ID: idDoDono as string
        })

        // 4. Retorna 201 (Criado) com os dados do pet
        return reply.status(201).send(novoPet)

        } catch (error: any) {
        // Trata erros (ID não enviado, dados faltando, etc.)
        return reply.status(400).send({ error: error.message })
        }
    }
    
  async listarPorDono(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Pega o ID do dono (usuário logado) do cabeçalho
        const idDoDono = request.headers.authorization
        // 2. Envia para a camada de negócio executar
        const listaDePets = await listarPetsDoDonoBusiness.executar(idDoDono as string)
        // 3. Retorna 200 (OK) com a lista de pets
        return reply.status(200).send(listaDePets)
        } catch (error: any) {
        // 401 = Não autorizado (não enviou o ID)
        return reply.status(401).send({ error: error.message })
        }
    }

  async buscarPorId(request: FastifyRequest, reply: FastifyReply) {
      try {
        //Pega o ID do dono (usuário logado) do cabeçalho
        const idDoDono = request.headers.authorization

        //Pega o ID do pet dos parâmetros da URL
        const { idDoPet } = request.params as { idDoPet: string }

        //Envia para a camada de negócio
        const pet = await buscarPetPorIdBusiness.executar({
          idDoPet: idDoPet,
          idDoDono: idDoDono as string
        })

        //Retorna 200 (OK) com os dados do pet
        return reply.status(200).send(pet)

      } catch (error: any) {
        // 404 = Não encontrado
        // 401 = Não autorizado (não é o dono)
        return reply.status(error.message.includes("Acesso negado") ? 401 : 404).send({ error: error.message })
      }
  }

  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    try {
      //Pega o ID do dono (usuário logado) do cabeçalho
      const idDoDono = request.headers.authorization

      //Pega o ID do pet dos parâmetros da URL
      const { idDoPet } = request.params as { idDoPet: string }

      //Pega os dados para atualizar do corpo da requisição
      const dados = request.body as PetUpdateDTO

      //Envia para a camada de negócio
      const pet = await atualizarPetBusiness.executar({
        idDoPet: idDoPet,
        idDoDono: idDoDono as string,
        dados: dados
      })

      //Retorna 200 (OK) com os dados do pet atualizado
      return reply.status(200).send(pet)

    } catch (error: any) {
      return reply.status(error.message.includes("Acesso negado") ? 401 : 400).send({ error: error.message })
    }
  }

  async deletar(request: FastifyRequest, reply: FastifyReply) {
    try {
      //Pega o ID do dono (usuário logado) do cabeçalho
      const idDoDono = request.headers.authorization

      //Pega o ID do pet dos parâmetros da URL
      const { idDoPet } = request.params as { idDoPet: string }

      //Envia para a camada de negócio
      const resultado = await deletarPetBusiness.executar({
        idDoPet: idDoPet,
        idDoDono: idDoDono as string
      })

      //Retorna 200 (OK) com a mensagem de sucesso
      return reply.status(200).send(resultado)

    } catch (error: any) {
      return reply.status(error.message.includes("Acesso negado") ? 401 : 400).send({ error: error.message })
    }
  }
  // (Futuramente: deletarPet, etc.)
}

export { PetController }
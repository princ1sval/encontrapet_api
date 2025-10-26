import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarPetBusiness } from '../business/CriarPetBusiness'
import { ListarPetsDoDonoBusiness } from '../business/ListarPetsDoDonoBusiness'

const criarPetBusiness = new CriarPetBusiness()
const listarPetsDoDonoBusiness = new ListarPetsDoDonoBusiness()

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

    
  // (Futuramente: deletarPet, etc.)
}

export { PetController }
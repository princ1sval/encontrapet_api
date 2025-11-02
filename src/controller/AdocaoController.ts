// src/controller/AdocaoController.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { ListarPetsParaAdocaoBusiness } from '../business/ListarPetsParaAdocaoBusiness'
import { BuscarPetParaAdocaoBusiness } from '../business/BuscarPetParaAdocaoBusiness'

// Instancia a camada de negócio
const listarPetsParaAdocaoBusiness = new ListarPetsParaAdocaoBusiness()
const buscarPetParaAdocaoBusiness = new BuscarPetParaAdocaoBusiness()

class AdocaoController {

    async listar(request: FastifyRequest, reply: FastifyReply) {

    try {
      // (Futuramente, passaremos os filtros da 'request.query' aqui)
        const listaDePets = await listarPetsParaAdocaoBusiness.executar()


        return reply.status(200).send(listaDePets)

        } catch (error: any) {
        return reply.status(500).send({ error: "Erro interno no servidor." })
        }
    }
    
    async buscarPorId(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { idDoPet } = request.params as { idDoPet: string }

        const pet = await buscarPetParaAdocaoBusiness.executar(idDoPet)

        return reply.status(200).send(pet)

    } catch (error: any) {

        return reply.status(404).send({ error: error.message })
        }
    }
}

export { AdocaoController }
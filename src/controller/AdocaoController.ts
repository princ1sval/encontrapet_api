// src/controller/AdocaoController.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { ListarPetsParaAdocaoBusiness } from '../business/ListarPetsParaAdocaoBusiness'
import { BuscarPetParaAdocaoBusiness } from '../business/BuscarPetParaAdocaoBusiness'
import { CriarCandidaturaBusiness } from '../business/CriarCandidaturaBusiness'

// Instancia as camadas de negócios
const listarPetsParaAdocaoBusiness = new ListarPetsParaAdocaoBusiness()
const buscarPetParaAdocaoBusiness = new BuscarPetParaAdocaoBusiness()
const criarCandidaturaBusiness = new CriarCandidaturaBusiness()

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

    async criarCandidatura(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Pega o ID do usuário logado (candidato) do header
        const idDoUsuario = request.headers.authorization

        // 2. Pega o ID do pet da URL
        const { idDoPet } = request.params as { idDoPet: string }

        // 3. Envia os IDs para a camada de negócio
        const candidatura = await criarCandidaturaBusiness.executar({
            usuarioId: idDoUsuario as string,
            petId: idDoPet
        })

        return reply.status(201).send(candidatura)

        } catch (error: any) {
        return reply.status(400).send({ error: error.message })
        }
    }

    
}

export { AdocaoController }
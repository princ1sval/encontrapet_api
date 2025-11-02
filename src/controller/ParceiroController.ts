import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarParceiroBusiness } from '../business/CriarParceiroBusiness'
import { ParceiroDTO } from '../data/ParceiroData'


const criarParceiroBusiness = new CriarParceiroBusiness()

class ParceiroController {

  // Método 'criar'
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

}

export { ParceiroController }
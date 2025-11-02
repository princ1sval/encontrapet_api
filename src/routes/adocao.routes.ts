import { FastifyInstance } from 'fastify'
import { AdocaoController } from '../controller/AdocaoController'

// Instancia o controller
const adocaoController = new AdocaoController()

// Registra as rotas de adoção
export async function adocaoRoutes(app: FastifyInstance) {

    app.get('/adocao/pets', adocaoController.listar)
    app.get('/adocao/pets/:idDoPet', adocaoController.buscarPorId)

}
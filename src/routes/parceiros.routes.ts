import { FastifyInstance } from 'fastify'
import { ParceiroController } from '../controller/ParceiroController'


const parceiroController = new ParceiroController()

// Registra as rotas de parceiros
export async function parceirosRoutes(app: FastifyInstance) {

    app.post('/parceiros', parceiroController.criar)

  // (Futuramente: GET /parceiros, etc.)
}
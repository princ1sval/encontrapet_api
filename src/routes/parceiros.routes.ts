import { FastifyInstance } from 'fastify'
import { ParceiroController } from '../controller/ParceiroController'


const parceiroController = new ParceiroController()

// Registra as rotas de parceiros
export async function parceirosRoutes(app: FastifyInstance) {

    app.post('/parceiros', parceiroController.criar)
    app.get('/parceiros', parceiroController.listar)
    app.get('/parceiros/:idDoParceiro', parceiroController.buscarPorId)
    app.put('/parceiros/eu', parceiroController.atualizarPerfil)
    app.post('/parceiros/pets', parceiroController.cadastrarPet)

  // (Futuramente: GET /parceiros, etc.)
}
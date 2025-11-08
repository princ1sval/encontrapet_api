import { FastifyInstance } from 'fastify'
import { RelatorioController } from '../controller/RelatorioController'

const relatorioController = new RelatorioController()

// Registra as rotas de relatórios
export async function relatoriosRoutes(app: FastifyInstance) {

    app.post('/relatorios/perdido', relatorioController.criarPerdido)
}
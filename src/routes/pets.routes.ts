import { FastifyInstance } from 'fastify'
import { PetController } from '../controller/PetController'

const petController = new PetController()

export async function petsRoutes(app: FastifyInstance) {

  app.post('/pets', petController.criar)
  app.get('/pets', petController.listarPorDono)
  app.get('/pets/:idDoPet', petController.buscarPorId)
  app.put('/pets/:idDoPet', petController.atualizar)
  app.delete('/pets/:idDoPet', petController.deletar)
  // (Futuramente: GET /pets, DELETE /pets/:id, etc.)
}
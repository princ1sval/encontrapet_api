import { FastifyInstance } from 'fastify'
import { PetController } from '../controller/PetController'

const petController = new PetController()

export async function petsRoutes(app: FastifyInstance) {

  app.post('/pets', petController.criar)
  app.get('/pets', petController.listarPorDono)
  // (Futuramente: GET /pets, DELETE /pets/:id, etc.)
}
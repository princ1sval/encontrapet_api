import { FastifyInstance } from 'fastify'
import { UsuarioController } from '../controller/UsuarioController'

const usuarioController = new UsuarioController()

// Função que registra as rotas de usuário
export async function usuariosRoutes(app: FastifyInstance) {

    app.post('/usuarios', usuarioController.criar)
    app.post('/sessoes', usuarioController.autenticar)
    app.get('/usuarios/eu', usuarioController.buscarPerfil)
  // (Aqui teremos outras rotas)
}
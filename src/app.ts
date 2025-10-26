import fastify from 'fastify'
import cors from '@fastify/cors'
import { usuariosRoutes } from './routes/usuarios.routes'
import { petsRoutes } from './routes/pets.routes'

// Cria a aplicação Fastify
export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(usuariosRoutes)
app.register(petsRoutes)
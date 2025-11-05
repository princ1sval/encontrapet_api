import fastify from 'fastify'
import cors from '@fastify/cors'
import { usuariosRoutes } from './routes/usuarios.routes'
import { petsRoutes } from './routes/pets.routes'
import { parceirosRoutes } from './routes/parceiros.routes'
import { adocaoRoutes } from './routes/adocao.routes'

export const app = fastify()

app.register(cors, {
  origin: true, // Permite que qualquer origem (qualquer site) acesse sua API
  allowedHeaders: ['Content-Type', 'authorization']
})

app.register(usuariosRoutes)
app.register(petsRoutes)
app.register(parceirosRoutes)
app.register(adocaoRoutes)
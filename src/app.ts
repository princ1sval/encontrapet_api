// src/app.ts
import fastify from 'fastify'
import cors from '@fastify/cors'

// Cria a aplicação Fastify
export const app = fastify()

// Configura o CORS (para que seu frontend possa acessar a API)
app.register(cors, {
  origin: true, // Em produção, mude para o seu domínio
})

// --- (Futuramente, aqui registraremos as rotas) ---
// app.register(suasRotas)
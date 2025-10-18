// src/server.ts
import { app } from './app'

// Define a porta onde a API vai rodar
const PORTA = 3333

// Inicia o servidor
app.listen({
    port: PORTA,
  host: '0.0.0.0', // Permite que a API seja acessada de fora do container (importante)
}).then(() => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORTA}`)
})  
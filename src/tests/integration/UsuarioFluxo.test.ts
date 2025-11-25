import { app } from '../../app'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('Integração - Fluxo Completo de Usuário', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Deve permitir que um usuário se cadastre, faça login e veja seu perfil', async () => {
        
        const emailUnico = `teste_integracao_${Date.now()}@email.com`
        
        const payloadCadastro = {
        nome: "Usuário Integração",
        email: emailUnico,
        senha: "123456",
        telefone: "3299999999",
        cidade: "Muriaé"
        }

        const respostaCadastro = await app.inject({
        method: 'POST',
        url: '/usuarios',
        payload: payloadCadastro
        })

        expect(respostaCadastro.statusCode).toBe(201)
        const usuarioCriado = JSON.parse(respostaCadastro.body)
        expect(usuarioCriado).toHaveProperty('id')
        expect(usuarioCriado.email).toBe(emailUnico)

        const respostaLogin = await app.inject({
        method: 'POST',
        url: '/sessoes',
        payload: {
            email: emailUnico,
            senha: "123456"
        }
        })

        expect(respostaLogin.statusCode).toBe(200)
        const loginData = JSON.parse(respostaLogin.body)
        expect(loginData).toHaveProperty('idDoUsuario')
        
        const tokenDoUsuario = loginData.idDoUsuario

        const respostaPerfil = await app.inject({
        method: 'GET',
        url: '/usuarios/eu',
        headers: {
            authorization: tokenDoUsuario
        }
        })

        expect(respostaPerfil.statusCode).toBe(200)
        const perfil = JSON.parse(respostaPerfil.body)
        expect(perfil.nome).toBe("Usuário Integração")
        expect(perfil).not.toHaveProperty('senha')
    })
})
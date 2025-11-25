import { app } from '../../app'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('Integração - Fluxo de Pets Pessoais', () => {

    beforeAll(async () => { await app.ready() })
    afterAll(async () => { await app.close() })

    it('Deve permitir que um usuário logado cadastre e liste seus pets', async () => {
    
    const emailUnico = `dono_pet_${Date.now()}@email.com`
    
    await app.inject({
        method: 'POST',
        url: '/usuarios',
        payload: {
            nome: "Dono do Pet",
            email: emailUnico,
            senha: "123",
            telefone: "000",
            cidade: "Muriaé"
        }
        })

        const loginRes = await app.inject({
        method: 'POST',
        url: '/sessoes',
        payload: { email: emailUnico, senha: "123" }
        })
        const idDoDono = JSON.parse(loginRes.body).idDoUsuario

        const petPayload = {
        nome: "Rex Integração",
        especie: "cachorro",
        raca: "Pastor",
        cor: "Preto"
        }

        const createRes = await app.inject({
        method: 'POST',
        url: '/pets',
        headers: { authorization: idDoDono },
        payload: petPayload
        })

        expect(createRes.statusCode).toBe(201)
        const petCriado = JSON.parse(createRes.body)
        expect(petCriado.nome).toBe("Rex Integração")
        expect(petCriado.dono_ID).toBe(idDoDono) 


        const listRes = await app.inject({
        method: 'GET',
        url: '/pets',
        headers: { authorization: idDoDono }
        })

        expect(listRes.statusCode).toBe(200)
        const lista = JSON.parse(listRes.body)
        
        expect(Array.isArray(lista)).toBe(true)
        expect(lista.length).toBeGreaterThanOrEqual(1)
        expect(lista[0].nome).toBe("Rex Integração")
    })
})
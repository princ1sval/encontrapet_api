import { app } from '../../app'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('Integração - Fluxo de ONGs e Adoção', () => {

    beforeAll(async () => { await app.ready() })
    afterAll(async () => { await app.close() })

    it('Deve permitir que uma ONG se cadastre e disponibilize um pet para adoção', async () => {
        
        const emailOng = `ong_teste_${Date.now()}@email.com`
        
        const ongPayload = {
        nome: "ONG Amiga dos Bichos",
        email: emailOng,
        telefone: "3233334444",
        endereco: "Rua das Flores, 100"
        }

        const createOngRes = await app.inject({
        method: 'POST',
        url: '/parceiros',
        payload: ongPayload
        })

        expect(createOngRes.statusCode).toBe(201)
        const ongCriada = JSON.parse(createOngRes.body)
        expect(ongCriada).toHaveProperty('id')
        
        const idDaOng = ongCriada.id

        const petAdocaoPayload = {
        nome: "Gatinho Esperança",
        especie: "gato",
        raca: "SRD",
        cor: "Branco"
        }

        const createPetRes = await app.inject({
        method: 'POST',
        url: '/parceiros/pets',
        headers: { authorization: idDaOng },
        payload: petAdocaoPayload
        })

        expect(createPetRes.statusCode).toBe(201)
        const petCriado = JSON.parse(createPetRes.body)
        expect(petCriado.Ong_ID).toBe(idDaOng)

        const vitrineRes = await app.inject({
        method: 'GET',
        url: '/adocao/pets'
        })

        expect(vitrineRes.statusCode).toBe(200)
        const vitrine = JSON.parse(vitrineRes.body)
        
        const petEncontrado = vitrine.find((p: any) => p.id === petCriado.id)
        expect(petEncontrado).toBeDefined()
        expect(petEncontrado.nome).toBe("Gatinho Esperança")
    })
})
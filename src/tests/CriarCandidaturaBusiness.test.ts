// src/tests/CriarCandidaturaBusiness.test.ts
import { CriarCandidaturaBusiness } from '../business/CriarCandidaturaBusiness'
import { PetData } from '../data/PetData'
import { CandidaturaData } from '../data/CandidaturaData'

jest.mock('../data/PetData')
jest.mock('../data/CandidaturaData')

describe('CriarCandidaturaBusiness', () => {
    const criarCandidaturaBusiness = new CriarCandidaturaBusiness()
    const mockBuscarPet = PetData.prototype.buscarPorId as jest.Mock
    const mockCriarCandidatura = CandidaturaData.prototype.criar as jest.Mock

    beforeEach(() => { jest.clearAllMocks() })

    it('Deve bloquear candidatura se o pet não for de uma ONG (ex: pet perdido)', async () => {
        const dados = { usuarioId: 'user-1', petId: 'pet-perdido' }
        
        mockBuscarPet.mockResolvedValue({ 
        id: 'pet-perdido', 
        Ong_ID: null 
        })

        await expect(criarCandidaturaBusiness.executar(dados))
        .rejects
        .toThrow('Pet não encontrado ou não está disponível para adoção.')

        expect(mockCriarCandidatura).not.toHaveBeenCalled()
    })
})
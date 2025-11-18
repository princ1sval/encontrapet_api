// src/tests/DeletarPetBusiness.test.ts
import { DeletarPetBusiness } from '../business/DeletarPetBusiness'
import { PetData } from '../data/PetData'

// Mock Automático
jest.mock('../data/PetData')

describe('DeletarPetBusiness', () => {

    const deletarPetBusiness = new DeletarPetBusiness()
    
    const mockBuscarPorId = PetData.prototype.buscarPorId as jest.Mock
    const mockDeletar = PetData.prototype.deletar as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve deletar o pet com sucesso se pertencer ao usuário', async () => {
        const dadosEntrada = { idDoPet: 'pet-123', idDoDono: 'dono-123' }

        mockBuscarPorId.mockResolvedValue({ 
        id: 'pet-123', 
        dono_ID: 'dono-123' 
        })

        const resultado = await deletarPetBusiness.executar(dadosEntrada)

        expect(mockDeletar).toHaveBeenCalledWith('pet-123')
        expect(resultado).toEqual({ message: "Pet deletado com sucesso." })
    })

    it('Deve bloquear (Erro) se o usuário tentar deletar pet de outro', async () => {
        const dadosEntrada = { idDoPet: 'pet-123', idDoDono: 'eu-sou-hacker' }

        mockBuscarPorId.mockResolvedValue({ 
        id: 'pet-123', 
        dono_ID: 'dono-real' 
        })

        await expect(deletarPetBusiness.executar(dadosEntrada))
        .rejects
        .toThrow('Acesso negado')
        
        expect(mockDeletar).not.toHaveBeenCalled()
    })
})
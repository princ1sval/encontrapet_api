import { BuscarPetParaAdocaoBusiness } from '../business/BuscarPetParaAdocaoBusiness'
import { PetData } from '../data/PetData'

jest.mock('../data/PetData')

describe('BuscarPetParaAdocaoBusiness', () => {

    const buscarPetParaAdocaoBusiness = new BuscarPetParaAdocaoBusiness()
    const mockBuscarPorId = PetData.prototype.buscarPorId as jest.Mock

    beforeEach(() => { jest.clearAllMocks() })

    it('Deve retornar o pet se ele pertencer a uma ONG', async () => {
        const idDoPet = 'pet-ong-123'
        
        mockBuscarPorId.mockResolvedValue({ 
        id: idDoPet, 
        nome: 'Fofinho',
        Ong_ID: 'ong-123'
        })

        const resultado = await buscarPetParaAdocaoBusiness.executar(idDoPet)

        expect(resultado).toHaveProperty('id', idDoPet)
    })

    it('Deve bloquear (Erro) se o pet não for de adoção (pet pessoal)', async () => {
        const idDoPet = 'pet-pessoal-123'

        mockBuscarPorId.mockResolvedValue({ 
        id: idDoPet, 
        nome: 'Rex',
        Ong_ID: null 
        })

        await expect(buscarPetParaAdocaoBusiness.executar(idDoPet))
        .rejects
        .toThrow('Este pet não está disponível para adoção.')
    })
})
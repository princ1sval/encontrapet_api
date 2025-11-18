import { CriarRelatorioPerdidoBusiness } from '../business/CriarRelatorioPerdidoBusiness'
import { RelatorioData } from '../data/RelatorioData'
import { PetData } from '../data/PetData'

jest.mock('../data/RelatorioData')
jest.mock('../data/PetData')

describe('CriarRelatorioPerdidoBusiness', () => {
    
    const criarRelatorioPerdidoBusiness = new CriarRelatorioPerdidoBusiness()
    
    const mockBuscarPorId = PetData.prototype.buscarPorId as jest.Mock
    const mockCriarRelatorio = RelatorioData.prototype.criar as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve criar um relatório com sucesso se o pet pertencer ao usuário', async () => {
        const dadosEntrada = {
        idDoUsuarioLogado: 'dono-123',
        idDoPet: 'pet-123',
        latitude: -21.13,
        longitude: -42.36,
        descricao: 'Fugiu'
        }

        mockBuscarPorId.mockResolvedValue({ 
        id: 'pet-123', 
        dono_ID: 'dono-123' 
        })

        mockCriarRelatorio.mockResolvedValue({ id: 'novo-relatorio' })

        const resultado = await criarRelatorioPerdidoBusiness.executar(dadosEntrada)

        expect(mockCriarRelatorio).toHaveBeenCalledTimes(1)
        expect(resultado).toHaveProperty('id')
    })

    it('Deve bloquear (ERRO) se o usuário tentar reportar um pet que não é dele', async () => {
        const dadosEntrada = {
        idDoUsuarioLogado: 'impostor-999', 
        idDoPet: 'pet-123',
        latitude: -21.13,
        longitude: -42.36,
        descricao: 'Fugiu'
        }

        mockBuscarPorId.mockResolvedValue({ 
        id: 'pet-123', 
        dono_ID: 'dono-123' 
        })

        await expect(criarRelatorioPerdidoBusiness.executar(dadosEntrada))
        .rejects
        .toThrow('Acesso negado') 
        
        expect(mockCriarRelatorio).not.toHaveBeenCalled()
    })
})
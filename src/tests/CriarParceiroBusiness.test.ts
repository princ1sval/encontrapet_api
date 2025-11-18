import { CriarParceiroBusiness } from '../business/CriarParceiroBusiness'
import { ParceiroData } from '../data/ParceiroData'

jest.mock('../data/ParceiroData')

describe('CriarParceiroBusiness', () => {
    const criarParceiroBusiness = new CriarParceiroBusiness()
    const mockBuscarPorEmail = ParceiroData.prototype.buscarPorEmail as jest.Mock
    const mockCriar = ParceiroData.prototype.criar as jest.Mock

    beforeEach(() => { jest.clearAllMocks() })

    it('Deve bloquear cadastro de ONG com e-mail duplicado', async () => {
        const dadosOng = { 
        nome: 'ONG Teste', 
        email: 'ong@existe.com', 
        telefone: '123', 
        endereco: 'Rua A' 
        }
        mockBuscarPorEmail.mockResolvedValue({ id: 'ong-velha', email: 'ong@existe.com' })

        await expect(criarParceiroBusiness.executar(dadosOng))
        .rejects
        .toThrow('Este e-mail já está em uso por outra ONG.')
        
        expect(mockCriar).not.toHaveBeenCalled()
    })
})
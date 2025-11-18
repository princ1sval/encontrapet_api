import { CriarUsuarioBusiness } from '../business/CriarUsuarioBusiness'
import { UsuarioData } from '../data/UsuarioData'

jest.mock('../data/UsuarioData')

describe('CriarUsuarioBusiness', () => {

    const criarUsuarioBusiness = new CriarUsuarioBusiness()
    
    const mockBuscarPorEmail = UsuarioData.prototype.buscarPorEmail as jest.Mock
    const mockCriar = UsuarioData.prototype.criar as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve criar um usuário com sucesso se o e-mail não existir', async () => {
        const dadosUsuario = {
        nome: 'Teste',
        email: 'novo@email.com',
        senha: '123',
        telefone: '000',
        cidade: 'Muriaé'
        }

        mockBuscarPorEmail.mockResolvedValue(null)
        mockCriar.mockResolvedValue({ id: 'novo-id', ...dadosUsuario })

        const resultado = await criarUsuarioBusiness.executar(dadosUsuario)

        expect(mockCriar).toHaveBeenCalledTimes(1)
        expect(resultado).toHaveProperty('id')
    })

    it('Deve falhar ao tentar criar um usuário com e-mail duplicado', async () => {
        const dadosUsuario = {
        nome: 'Teste',
        email: 'jaexiste@email.com',
        senha: '123',
        telefone: '000',
        cidade: 'Muriaé'
        }

        mockBuscarPorEmail.mockResolvedValue({ id: 'id-velho', email: 'jaexiste@email.com' })

        await expect(criarUsuarioBusiness.executar(dadosUsuario))
        .rejects
        .toThrow('Este e-mail já está em uso.')
        
        expect(mockCriar).not.toHaveBeenCalled()
    })
})
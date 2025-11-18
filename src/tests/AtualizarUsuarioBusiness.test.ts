// src/tests/AtualizarUsuarioBusiness.test.ts
import { AtualizarUsuarioBusiness } from '../business/AtualizarUsuarioBusiness'
import { UsuarioData } from '../data/UsuarioData'

// Mock Automático
jest.mock('../data/UsuarioData')

describe('AtualizarUsuarioBusiness', () => {

    const atualizarUsuarioBusiness = new AtualizarUsuarioBusiness()
    
    const mockBuscarPorId = UsuarioData.prototype.buscarPorId as jest.Mock
    const mockBuscarPorEmail = UsuarioData.prototype.buscarPorEmail as jest.Mock
    const mockAtualizar = UsuarioData.prototype.atualizar as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('Deve atualizar o usuário com sucesso', async () => {
        const idDoUsuario = 'meu-id-123'
        const dadosNovos = { nome: 'Novo Nome' }

        mockBuscarPorId.mockResolvedValue({ id: idDoUsuario, nome: 'Antigo' })
        
        mockAtualizar.mockResolvedValue({ 
        id: idDoUsuario, 
        nome: 'Novo Nome', 
        senha: '123'
        })

        const resultado = await atualizarUsuarioBusiness.executar(idDoUsuario, dadosNovos)

        expect(mockAtualizar).toHaveBeenCalledTimes(1)
        expect(resultado).toHaveProperty('nome', 'Novo Nome')
        expect(resultado).not.toHaveProperty('senha')
    })

    it('Deve bloquear (Erro) se tentar usar um e-mail que já pertence a outro', async () => {
        const idDoUsuario = 'meu-id-123'
        const dadosNovos = { email: 'email@ocupado.com' }

        mockBuscarPorId.mockResolvedValue({ id: idDoUsuario })

        mockBuscarPorEmail.mockResolvedValue({ 
        id: 'outro-cara-id-999', 
        email: 'email@ocupado.com' 
        })

        await expect(atualizarUsuarioBusiness.executar(idDoUsuario, dadosNovos))
        .rejects
        .toThrow('Este e-mail já está em uso por outro usuário.')

        expect(mockAtualizar).not.toHaveBeenCalled()
    })
})
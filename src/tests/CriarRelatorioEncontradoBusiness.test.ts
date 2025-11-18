import { CriarRelatorioEncontradoBusiness } from '../business/CriarRelatorioEncontradoBusiness'
import { RelatorioData } from '../data/RelatorioData'
import { PetData } from '../data/PetData'

jest.mock('../data/RelatorioData')
jest.mock('../data/PetData')

describe('CriarRelatorioEncontradoBusiness', () => {

    const criarRelatorioEncontradoBusiness = new CriarRelatorioEncontradoBusiness()
    
    const mockCriarPet = PetData.prototype.criar as jest.Mock
    const mockCriarRelatorio = RelatorioData.prototype.criar as jest.Mock

    beforeEach(() => { jest.clearAllMocks() })

    it('Deve criar o Pet e o Relatório em sequência', async () => {
        const dadosEntrada = {
        nome: 'Cão Achado',
        especie: 'cachorro',
        raca: 'SRD',
        cor: 'Preto',
        latitude: -21.13,
        longitude: -42.36,
        descricao: 'Estava na rua'
        }

        mockCriarPet.mockResolvedValue({ id: 'novo-pet-id', nome: 'Cão Achado' })
        
        mockCriarRelatorio.mockResolvedValue({ id: 'novo-relatorio-id', tipo: 'encontrado' })

        const resultado = await criarRelatorioEncontradoBusiness.executar(dadosEntrada)

        expect(mockCriarPet).toHaveBeenCalledTimes(1)
        
        expect(mockCriarRelatorio).toHaveBeenCalledTimes(1)
        
        expect(mockCriarRelatorio).toHaveBeenCalledWith(expect.objectContaining({
        petId: 'novo-pet-id'
        }))

        expect(resultado).toHaveProperty('novoPet')
        expect(resultado).toHaveProperty('novoRelatorio')
    })
})
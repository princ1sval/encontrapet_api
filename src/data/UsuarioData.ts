import { prisma } from '../bd'

// Define a "interface" ou "tipo" dos dados do usuário
interface UsuarioDTO {
    // o Id será criado pelo padrão UUID
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    cidade: string;
}

interface UsuarioUpdateDTO {
    nome?: string;
    email?: string;
    senha?: string;
    telefone?: string;
    cidade?: string;
}

class UsuarioData {
  // metodo de busca por e-mail 
    async buscarPorEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: { email }
        })
    }
    
  // Metodos para buscar por Nome
    async buscarPorNome(nome: string) {
        return await prisma.usuario.findMany({
            where: {
                // "contains" = busca por parte do nome (como o LIKE %nome%)
                // "mode: 'insensitive'" = ignora maiúsculas/minúsculas
                nome: {
                contains: nome,
                mode: 'insensitive' 
                }
            }
        })
    }

  // metodo pra buscar pelo ID  
    async buscarPorId(id: string) {
    return await prisma.usuario.findUnique({
        where: { id }
        })
    }

  //metodo pra criar um novo usuario
    async criar(dados: UsuarioDTO) {
        return await prisma.usuario.create({
            data: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha, 
                telefone: dados.telefone,
                cidade: dados.cidade,
            }
        })
    }

    async atualizar(id: string, dados: UsuarioUpdateDTO) {
    return await prisma.usuario.update({
        where: { id },
        data: dados // O Prisma só atualiza os campos que forem enviados
        })
    }
}

export { UsuarioData, UsuarioDTO, UsuarioUpdateDTO }
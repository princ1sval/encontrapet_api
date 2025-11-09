
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.candidatura.deleteMany()
    await prisma.relatorio.deleteMany()
    await prisma.pet.deleteMany()
    await prisma.oNG.deleteMany()
    await prisma.usuario.deleteMany()


    const usuario = await prisma.usuario.create({
    data: {
        id: '3ed9dac8-2874-4f88-b9bd-e9e58f135a49', // ID Fixo para testar
        nome: "João Pedro (Teste)",
        email: "joao.teste@email.com",
        senha: "123456",
        telefone: "32988776655",
        cidade: "Muriaé"
        }
    })
    console.log(`Usuário de teste criado: ${usuario.nome}`)


    const ong = await prisma.oNG.create({
        data: {
        id: '93a78890-a41a-4ca9-80b7-cf52424be71e', // ID Fixo para testar
        nome: "ONG Protetores (Teste)",
        email: "contato@protetoresmuriae.com",
        telefone: "3237221122",
        endereco: "Rua das Flores, 100, Centro, Muriaé"
        }
    })
    console.log(`ONG de teste criada: ${ong.nome}`)

    const petPessoal = await prisma.pet.create({
        data: {
        nome: "Melissa (Teste)",
        especie: "cachorro",
        raca: "Shitzu",
        cor: "Mel",
        dono_ID: usuario.id
        }
    })
    console.log(`Pet pessoal criado: ${petPessoal.nome}`)

    const petAdocao = await prisma.pet.create({
        data: {
        nome: "Fofinho (Teste)",
        especie: "gato",
        raca: "Siamês",
        cor: "Branco e cinza",
        Ong_ID: ong.id // <-- Liga à ONG
        }
    })
    console.log(`Pet de adoção criado: ${petAdocao.nome}`)
    }

    main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
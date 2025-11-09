import { prisma } from '../bd'
import { Prisma } from '@prisma/client'

interface RelatorioDTO {
    tipo: 'perdido' | 'encontrado' | 'avistado';
    latitude: number; 
    longitude: number;   
    descricao: string;
    petId: string;
}

interface FiltrosRelatorio {
    latitude?: number;
    longitude?: number;
    raio_km?: number;
}

class RelatorioData {
    async criar(dados: RelatorioDTO) {

    const lon = dados.longitude
    const lat = dados.latitude

    const [novoRelatorio] = await prisma.$queryRaw<any[]>(
        Prisma.sql`
            INSERT INTO "relatorios" 
            ("id", "tipo", "descricao", "Pet_ID", "localizacao")
            VALUES 
            (gen_random_uuid(), ${dados.tipo}, ${dados.descricao}, ${dados.petId}, ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326))
            RETURNING 
            "id", "tipo", "descricao", "Pet_ID", "data_relato",
            ST_X("localizacao"::geometry) as longitude, -- Correção aqui (cast)
            ST_Y("localizacao"::geometry) as latitude    -- Correção aqui (cast)
        `
        )
        return novoRelatorio
    }

    async listarPublicos(filtros: FiltrosRelatorio) {

    // Se o usuário passou latitude, longitude E raio...
    if (filtros.latitude && filtros.longitude && filtros.raio_km) {

        const { latitude, longitude, raio_km } = filtros
        const raioEmMetros = raio_km * 1000 

        // Este é o SQL puro para a Geo-Query
        // ST_DWithin: Retorna 'true' se as geometrias estiverem "Dentro de uma Distância"
        // Usamos o 'geography' para calcular em metros no globo terrestre
        return await prisma.$queryRaw(
        Prisma.sql`
            SELECT 
                r."id", r."tipo", r."descricao", r."Pet_ID", r."data_relato",
                ST_X(r."localizacao"::geometry) as longitude,
                ST_Y(r."localizacao"::geometry) as latitude,
                p."id" as "petId", p."nome", p."especie", p."raca", p."cor", p."dono_ID", p."Ong_ID"
            FROM "relatorios" r
            LEFT JOIN "pets" p ON r."Pet_ID" = p."id"
            WHERE ST_DWithin(
                r."localizacao",
                ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
                ${raioEmMetros}
            )
            ORDER BY r."data_relato" DESC
            `
        )
        }

        // Se nenhum filtro de geo foi passado, roda a busca normal
        return await prisma.relatorio.findMany({
        include: { pet: true },
        orderBy: { data_relato: 'desc' }
        })
    }

    async buscarPorId(id: string) {
    return await prisma.relatorio.findUnique({
        where: { id },
        include: {
        pet: true
        }
    })
    }

    async buscarCombinacoes(relatorioPerdido: any) {

    const raioEmMetros = 10 * 1000 // Raio de 10km
    const especieDoPetPerdido = relatorioPerdido.pet.especie

    // Este é o SQL puro para a Geo-Query
    // 1. Encontra relatórios "encontrado" ou "avistado"
    // 2. Que estejam "Dentro de uma Distância" (ST_DWithin)
    // 3. E que tenham a mesma espécie (p."especie" = ...)
    return await prisma.$queryRaw(
        Prisma.sql`
            SELECT 
            r."id", r."tipo", r."descricao", r."Pet_ID", r."data_relato",
            ST_X(r."localizacao"::geometry) as longitude,
            ST_Y(r."localizacao"::geometry) as latitude,
            p."id" as "petId", p."nome", p."especie", p."raca", p."cor"
            FROM "relatorios" r
            LEFT JOIN "pets" p ON r."Pet_ID" = p."id"
            WHERE 
            (r."tipo" = 'encontrado' OR r."tipo" = 'avistado') 
            AND
            ST_DWithin(
                r."localizacao",
                ${relatorioPerdido.localizacao}, -- a localização geográfica do pet perdido
                ${raioEmMetros}
            )
            AND
            p."especie" = ${especieDoPetPerdido}
            ORDER BY r."data_relato" DESC
        `
        )
    }

}

export { RelatorioData, RelatorioDTO, FiltrosRelatorio }
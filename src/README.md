🐾 EncontraPet API

O EncontraPet é um projeto acadêmico criado para centralizar informações sobre pets perdidos e facilitar a adoção responsável na região de Muriaé-MG.
A plataforma conecta tutores, ONGs e a comunidade, utilizando geolocalização e inteligência de dados para agilizar reencontros e ampliar a divulgação de animais disponíveis para adoção.

🚀 Tecnologias Utilizadas

Node.js + TypeScript

Fastify (servidor web)

PostgreSQL + PostGIS

Prisma ORM

Jest

Zod (planejado)

🏛️ Arquitetura

O sistema segue uma arquitetura baseada em MVC para API REST, distribuída da seguinte forma:

src/routes → Rotas e endpoints

src/controller → Controle das requisições

src/business → Regras de negócio

src/data → Acesso ao banco com Prisma

Essa estrutura garante organização, escalabilidade e fácil manutenção.

📍 Endpoints Principais

A API possui 24 endpoints, divididos em 6 módulos:

👤 Usuários

Criar conta

Login

Ver perfil

Atualizar perfil

🐶 Pets Pessoais

Cadastrar pet

Listar pets

Ver detalhes

Atualizar

Remover

🚨 Relatórios (emergência)

Pet perdido

Pet encontrado

Pet avistado

🔍 Busca & Inteligência

Consultas públicas com filtros (raio, lat, long)

Detalhes do relatório

Geo-Query para encontrar combinações de casos próximos

🏢 Parceiros (ONGs)

Cadastro

Listagem

Perfil público

Atualização de dados

🏠 Adoção

ONG cadastra pet

Vitrine de adoção

Detalhes do pet

Candidaturas

ONG visualiza interessados

⚙️ Instalação e Execução
✔ Pré-requisitos

Node.js (LTS)

PostgreSQL com PostGIS

Git

📌 Passo a passo

Clonar o projeto

git clone https://github.com/princ1sval/encontrapet_api.git
cd encontrapet_api


Instalar dependências

npm install


Configurar o arquivo .env

DATABASE_URL="postgresql://usuario:senha@localhost:5432/encontrapet_db"


Criar o banco com PostGIS ativo

Rodar as migrações

npx prisma migrate dev


Iniciar o servidor

npm run dev


Servidor disponível em: http://localhost:3333
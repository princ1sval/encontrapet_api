// src/bd.ts
import { PrismaClient } from '@prisma/client'

// Cria uma instância global do Prisma Client
export const prisma = new PrismaClient()
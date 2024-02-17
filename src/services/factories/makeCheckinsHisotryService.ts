import { CheckinsHistory } from '../checkinsHistory.service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repo'

export function makeCheckinsHistoryService() {
  // pego o prisma
  const checkInsRepo = new PrismaCheckInsRepository()
  // construo a classe
  const useCase = new CheckinsHistory(checkInsRepo)
  return useCase
}

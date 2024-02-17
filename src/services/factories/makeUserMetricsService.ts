import { GetUserMetrics } from '../getUserMetrics.service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repo'

export function makeGetUserMetricsService() {
  // pego o prisma
  const checkInsRepo = new PrismaCheckInsRepository()
  // construo a classe
  const useCase = new GetUserMetrics(checkInsRepo)
  return useCase
}

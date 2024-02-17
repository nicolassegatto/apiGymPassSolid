import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repo'
import { SearchNearGymsUseCase } from '../searchNearGyms.service'

export function makeSearchGymsNearService() {
  // pego o prisma
  const checkInsRepo = new PrismaGymsRepository()
  // construo a classe
  const useCase = new SearchNearGymsUseCase(checkInsRepo)
  return useCase
}

import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repo'
import { SearchGymsUseCase } from '../searchGyms.service'

export function makeSearchGymsService() {
  // pego o prisma
  const checkInsRepo = new PrismaGymsRepository()
  // construo a classe
  const useCase = new SearchGymsUseCase(checkInsRepo)
  return useCase
}

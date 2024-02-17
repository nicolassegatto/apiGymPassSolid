import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repo'
import { CreateGymUseCase } from '../createGym.service'

export function makeCreateGymService() {
  // pego o prisma
  const checkInsRepo = new PrismaGymsRepository()
  // construo a classe
  const useCase = new CreateGymUseCase(checkInsRepo)
  return useCase
}

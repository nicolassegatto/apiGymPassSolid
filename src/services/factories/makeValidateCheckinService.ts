import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repo'
import { ValidateCheckInService } from '../validateCheckin.service'

export function makeValidateCheckinService() {
  // pego o prisma
  const checkInsRepo = new PrismaCheckInsRepository()
  // construo a classe
  const useCase = new ValidateCheckInService(checkInsRepo)
  return useCase
}

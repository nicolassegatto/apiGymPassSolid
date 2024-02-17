import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repo'
import { CheckInService } from '../checkin.service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repo'

export function makeCheckInService() {
  // pego o prisma
  const checkInsRepo = new PrismaCheckInsRepository()
  const gymsRepo = new PrismaGymsRepository()
  // construo a classe
  const useCase = new CheckInService(checkInsRepo, gymsRepo)
  return useCase
}

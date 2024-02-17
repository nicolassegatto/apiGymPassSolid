import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repo'
import { GetUserProfileService } from '../getUserProfile.service'

export function makeGetUserProfileService() {
  // pego o prisma
  const userRepo = new PrismaUsersRepository()
  // construo a classe
  const useCase = new GetUserProfileService(userRepo)
  return useCase
}

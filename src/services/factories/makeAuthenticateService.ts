import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repo'
import { AuthenticateService } from '../authenticate.service'

export function makeAuthenticateService() {
  // pego o prisma
  const userRepo = new PrismaUsersRepository()
  // construo a classe
  const authenticateService = new AuthenticateService(userRepo)
  return authenticateService
}

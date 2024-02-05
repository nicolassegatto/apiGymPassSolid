import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repo'
import { RegisterUseCase } from '../register.service'

export function makeRegisterService() {
  // pego o prisma
  const userRepo = new PrismaUsersRepository()

  // construo a classe
  const registerUseCase = new RegisterUseCase(userRepo)

  return registerUseCase
}

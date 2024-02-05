import { UsersRepository } from '@/repositories/usersInterface.repo'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/userAlreadyExists.error'
import { User } from '@prisma/client'

interface RegisterUseCaseReq {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseRes {
  user: User
}
// SOLID -
// D - Dependency inversion principle

export class RegisterUseCase {
  constructor(private usersRepo: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseReq): Promise<RegisterUseCaseRes> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepo.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepo.create({ name, email, password_hash })

    return { user }
  }
}

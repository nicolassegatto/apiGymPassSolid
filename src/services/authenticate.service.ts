import { UsersRepository } from '@/repositories/usersInterface.repo'
import { InvalidCredentialsError } from './errors/invalidCredentials.error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateServiceReq {
  email: string
  password: string
}

interface AuthenticateServiceRes {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceReq): Promise<AuthenticateServiceRes> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepo } from '@/repositories/inMemory/inMemoryUser.repo'
import { AuthenticateService } from '../authenticate.service'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalidCredentials.error'

let userRepo: InMemoryUsersRepo
// system under testing
let sut: AuthenticateService

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepo()
    sut = new AuthenticateService(userRepo)
  })

  it('should be able to authenticate', async () => {
    await userRepo.create({
      name: 'test',
      email: 'test@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'test@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await userRepo.create({
      name: 'test',
      email: 'test@test.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

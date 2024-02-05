import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register.service'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepo } from '@/repositories/inMemory/inMemoryUser.repo'
import { UserAlreadyExistsError } from '../errors/userAlreadyExists.error'

let userRepo: InMemoryUsersRepo
// system under testing
let sut: RegisterUseCase

describe('Register service Use Case', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepo()
    sut = new RegisterUseCase(userRepo)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

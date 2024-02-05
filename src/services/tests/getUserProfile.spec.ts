import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepo } from '@/repositories/inMemory/inMemoryUser.repo'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from '../getUserProfile.service'
import { ResourceNotFoundError } from '../errors/resourceNotFound.error'

let userRepo: InMemoryUsersRepo
// system under testing
let sut: GetUserProfileService

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepo()
    sut = new GetUserProfileService(userRepo)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepo.create({
      name: 'test',
      email: 'test@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('test')
  })

  it('should be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

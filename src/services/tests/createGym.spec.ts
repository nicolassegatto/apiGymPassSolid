import { InMemoryGymsRepo } from '@/repositories/inMemory/inMemoryGyms.repo'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from '../createGym.service'

let gymsRepo: InMemoryGymsRepo
let sut: CreateGymUseCase

describe('Register service Use Case', () => {
  beforeEach(() => {
    gymsRepo = new InMemoryGymsRepo()
    sut = new CreateGymUseCase(gymsRepo)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      latitude: -18.8837181,
      longitude: -48.2493067,
      phone: null,
      description: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

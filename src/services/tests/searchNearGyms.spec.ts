import { InMemoryGymsRepo } from '@/repositories/inMemory/inMemoryGyms.repo'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchNearGymsUseCase } from '../searchNearGyms.service'

let gymsRepo: InMemoryGymsRepo
let sut: SearchNearGymsUseCase

describe('Fetch nearby gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepo = new InMemoryGymsRepo()
    sut = new SearchNearGymsUseCase(gymsRepo)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepo.create({
      title: 'Near Gym',
      latitude: -18.8837181,
      longitude: -48.2493067,
      phone: null,
      description: null,
    })

    await gymsRepo.create({
      title: 'Far Gym',
      latitude: -18.6386544,
      longitude: -48.2129548,
      phone: null,
      description: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -18.8837181,
      userLongitude: -48.2493067,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

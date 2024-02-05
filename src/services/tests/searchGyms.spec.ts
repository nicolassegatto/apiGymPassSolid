import { InMemoryGymsRepo } from '@/repositories/inMemory/inMemoryGyms.repo'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from '../searchGyms.service'

let gymsRepo: InMemoryGymsRepo
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepo = new InMemoryGymsRepo()
    sut = new SearchGymsUseCase(gymsRepo)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepo.create({
      title: 'JavaScript Gym',
      latitude: -18.8837181,
      longitude: -48.2493067,
      phone: null,
      description: null,
    })

    await gymsRepo.create({
      title: 'TypeScript Gym',
      latitude: -18.8837181,
      longitude: -48.2493067,
      phone: null,
      description: null,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to feth paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepo.create({
        title: `JavaScript Gym ${i}`,
        latitude: -18.8837181,
        longitude: -48.2493067,
        phone: null,
        description: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})

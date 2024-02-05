import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepo } from '@/repositories/inMemory/inMemoryCheckIns.repo'
import { GetUserMetrics } from '../getUserMetrics.service'

let checkInsRepo: InMemoryCheckInsRepo
let sut: GetUserMetrics

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepo = new InMemoryCheckInsRepo()
    sut = new GetUserMetrics(checkInsRepo)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepo.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepo.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})

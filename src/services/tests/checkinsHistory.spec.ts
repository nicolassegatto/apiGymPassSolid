import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepo } from '@/repositories/inMemory/inMemoryCheckIns.repo'
import { CheckinsHistory } from '../checkinsHistory.service'

let checkInsRepo: InMemoryCheckInsRepo
let sut: CheckinsHistory

describe('CheckIn history Use Case', () => {
  beforeEach(async () => {
    checkInsRepo = new InMemoryCheckInsRepo()
    sut = new CheckinsHistory(checkInsRepo)
  })

  it('should be able to fetch check in history', async () => {
    await checkInsRepo.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepo.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to get paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepo.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})

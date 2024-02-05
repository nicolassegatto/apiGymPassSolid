import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepo } from '@/repositories/inMemory/inMemoryCheckIns.repo'
import { CheckInService } from '../checkin.service'
import { InMemoryGymsRepo } from '@/repositories/inMemory/inMemoryGyms.repo'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckinError } from '../errors/maxNumberOfCheckIns.error'
import { MaxDistanceError } from '../errors/maxDistance.error'

let checkInsRepo: InMemoryCheckInsRepo
let gymsRepo: InMemoryGymsRepo
// system under testing
let sut: CheckInService

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepo = new InMemoryCheckInsRepo()
    gymsRepo = new InMemoryGymsRepo()
    sut = new CheckInService(checkInsRepo, gymsRepo)

    await gymsRepo.create({
      id: 'gymId-01',
      title: 'JavaScript Gym',
      latitude: -18.8837181,
      longitude: -48.2493067,
      description: '',
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId-01',
      userId: 'user-01',
      userLatitude: -18.8837181,
      userLongitude: -48.2493067,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gymId-01',
      userId: 'user-01',
      userLatitude: -18.8837181,
      userLongitude: -48.2493067,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymId-01',
        userId: 'user-01',
        userLatitude: -18.8837181,
        userLongitude: -48.2493067,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinError)
  })

  it('should be able to check in in twice in diferets day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gymId-01',
      userId: 'user-01',
      userLatitude: -18.8837181,
      userLongitude: -48.2493067,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gymId-01',
      userId: 'user-01',
      userLatitude: -18.8837181,
      userLongitude: -48.2493067,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepo.items.push({
      id: 'gymId-02',
      title: 'academia do JS',
      latitude: new Decimal(-18.9288136),
      longitude: new Decimal(-48.2991199),
      description: '',
      phone: '',
    })

    expect(() =>
      sut.execute({
        gymId: 'gymId-02',
        userId: 'user-01',
        userLatitude: -18.8837181,
        userLongitude: -48.2493067,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

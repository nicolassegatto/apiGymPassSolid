import { CheckIn } from '@prisma/client'
import { CheckInsRepo } from '@/repositories/checkInsInterface.repo'
import { GymsRepository } from '@/repositories/gymsInterface.repo'
import { ResourceNotFoundError } from './errors/resourceNotFound.error'
import { getDistanceBetweenCoordinates } from '@/utils/getDistancesBetweenCordinates'
import { MaxDistanceError } from './errors/maxDistance.error'
import { MaxNumberOfCheckinError } from './errors/maxNumberOfCheckIns.error'

interface CheckInServiceReq {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInServiceRes {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepo: CheckInsRepo,
    private gymsRepo: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceReq): Promise<CheckInServiceRes> {
    const gym = await this.gymsRepo.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepo.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckinError()
    }

    const checkIn = await this.checkInsRepo.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}

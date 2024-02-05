import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gymsInterface.repo'

interface SearchNearGymsUseCaseReq {
  userLatitude: number
  userLongitude: number
}

interface SearchNearGymsUseCaseRes {
  gyms: Gym[]
}

export class SearchNearGymsUseCase {
  constructor(private gymRepo: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: SearchNearGymsUseCaseReq): Promise<SearchNearGymsUseCaseRes> {
    const gyms = await this.gymRepo.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}

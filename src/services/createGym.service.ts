import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gymsInterface.repo'

interface CreateGymUseCaseReq {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseRes {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepo: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseReq): Promise<CreateGymUseCaseRes> {
    const gym = await this.gymRepo.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}

import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gymsInterface.repo'

interface SearchGymsUseCaseReq {
  query: string
  page: number
}

interface SearchGymsUseCaseRes {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepo: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseReq): Promise<SearchGymsUseCaseRes> {
    const gyms = await this.gymRepo.searchMany(query, page)

    return { gyms }
  }
}

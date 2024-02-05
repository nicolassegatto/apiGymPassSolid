import { CheckInsRepo } from '@/repositories/checkInsInterface.repo'

interface GetUserMetricsReq {
  userId: string
}

interface GetUserMetricsRes {
  checkInsCount: number
}

export class GetUserMetrics {
  constructor(private checkInsRepo: CheckInsRepo) {}

  async execute({ userId }: GetUserMetricsReq): Promise<GetUserMetricsRes> {
    const checkInsCount = await this.checkInsRepo.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}

import { CheckIn } from '@prisma/client'
import { CheckInsRepo } from '@/repositories/checkInsInterface.repo'

interface CheckinsHistoryReq {
  userId: string
  page: number
}

interface CheckinsHistoryRes {
  checkIns: CheckIn[]
}

export class CheckinsHistory {
  constructor(private checkInsRepo: CheckInsRepo) {}

  async execute({
    userId,
    page,
  }: CheckinsHistoryReq): Promise<CheckinsHistoryRes> {
    const checkIns = await this.checkInsRepo.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}

import { CheckIn } from '@prisma/client'
import { CheckInsRepo } from '@/repositories/checkInsInterface.repo'
import { ResourceNotFoundError } from './errors/resourceNotFound.error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/lateCheckinValidation.error'

interface ValidateCheckInServiceReq {
  checkInId: string
}

interface ValidateCheckInServiceRes {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(private checkInsRepo: CheckInsRepo) {}

  async execute({
    checkInId,
  }: ValidateCheckInServiceReq): Promise<ValidateCheckInServiceRes> {
    const checkIn = await this.checkInsRepo.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepo.save(checkIn)

    return {
      checkIn,
    }
  }
}

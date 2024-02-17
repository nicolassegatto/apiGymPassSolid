import { makeValidateCheckinService } from '@/services/factories/makeValidateCheckinService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)

  const validateCheckInService = makeValidateCheckinService()

  // executo o metodo com a classe construida.
  await validateCheckInService.execute({
    checkInId,
  })

  return res.status(204).send()
}

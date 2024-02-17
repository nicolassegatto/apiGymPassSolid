import { makeCheckinsHistoryService } from '@/services/factories/makeCheckinsHisotryService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const searchCheckInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = searchCheckInHistoryQuerySchema.parse(req.query)

  const searchCheckInHistoryService = makeCheckinsHistoryService()

  // executo o metodo com a classe construida.
  const { checkIns } = await searchCheckInHistoryService.execute({
    userId: req.user.sub,
    page,
  })

  return res.status(200).send({
    checkIns,
  })
}

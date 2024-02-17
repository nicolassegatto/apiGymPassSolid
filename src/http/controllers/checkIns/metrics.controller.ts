import { makeGetUserMetricsService } from '@/services/factories/makeUserMetricsService'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  const getUserMetricsService = makeGetUserMetricsService()

  // executo o metodo com a classe construida.
  const { checkInsCount } = await getUserMetricsService.execute({
    userId: req.user.sub,
  })

  return res.status(200).send({
    checkInsCount,
  })
}

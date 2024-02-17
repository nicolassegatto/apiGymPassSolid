import { makeSearchGymsService } from '@/services/factories/makeSearchGymsService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { query, page } = searchGymsQuerySchema.parse(req.query)

  const searchGymsService = makeSearchGymsService()

  // executo o metodo com a classe construida.
  const { gyms } = await searchGymsService.execute({
    query,
    page,
  })

  return res.status(200).send({
    gyms,
  })
}

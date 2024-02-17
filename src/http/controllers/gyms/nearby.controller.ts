import { makeSearchGymsNearService } from '@/services/factories/makeSearchNearGymsService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchNearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)

  const searchNearbyGymsService = makeSearchGymsNearService()

  // executo o metodo com a classe construida.
  const { gyms } = await searchNearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return res.status(200).send({
    gyms,
  })
}

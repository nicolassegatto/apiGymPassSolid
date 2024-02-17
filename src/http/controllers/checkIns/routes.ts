import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { validate } from './validate.controller'
import { history } from './history.controller'
import { metrics } from './metrics.controller'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/checkIns/history', history)
  app.get('/checkIns/metrics', metrics)

  app.post('/gyms/:gymId/checkIns', create)
  app.patch(
    '/checkIns/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}

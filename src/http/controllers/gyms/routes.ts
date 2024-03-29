import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { FastifyInstance } from 'fastify'
import { search } from './search.controller'
import { searchNearby } from './nearby.controller'
import { create } from './create.controller'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', searchNearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}

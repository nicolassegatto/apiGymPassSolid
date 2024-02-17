import { makeGetUserProfileService } from '@/services/factories/makeUserProfileService'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const reqUserId = req.user.sub
  const getUserProfile = makeGetUserProfileService()

  const { user } = await getUserProfile.execute({
    userId: reqUserId,
  })

  return res.status(200).send({ ...user, password_hash: undefined })
}

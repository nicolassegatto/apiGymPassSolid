import { InvalidCredentialsError } from '@/services/errors/invalidCredentials.error'
import { makeAuthenticateService } from '@/services/factories/makeAuthenticateService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateService = makeAuthenticateService()

    // executo o metodo com a classe construida.
    await authenticateService.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }

  return res.status(200).send()
}
import { UserAlreadyExistsError } from '@/services/errors/userAlreadyExists.error'
import { makeRegisterService } from '@/services/factories/makeRegisterService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterService()

    // executo o metodo com a classe construida.
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message })
    }

    throw error
  }

  return res.status(201).send()
}

import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthUser } from '@/utils/test/createAndAuthUser'

describe('Search nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'some Description',
        phone: '3499999999',
        latitude: -18.8837181,
        longitude: -48.2493067,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'some Description',
        phone: '3499999999',
        latitude: -18.8837181,
        longitude: -48.2493067,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'AI Gym',
        description: 'some Description',
        phone: '3499999999',
        latitude: -18.6386544,
        longitude: -48.2129548,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -18.8837181, longitude: -48.2493067 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })
})

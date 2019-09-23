import request from 'supertest'
import app from '../../src/app.js'

import factory from '../factories'
import truncate from '../util/truncate.js'

let user = null
describe('Session', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('should be create profile', async () => {
    const user = await factory.create('User')
    const profile = await factory.attrs('Profile')
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })

    expect(body).toBeTruthy()

    await request(app)
      .post('/api/users/profiles')
      .set('Authorization', `Bearer ${body.token}`)
      .expect(200)
      .send(profile)
      .then(({ body }) => {
        const { data, success } = body
        expect(success).toBeTruthy()
        expect(data).toEqual({
          id: expect.toBeTruthy(),
          name: expect.toEqual(user.name),
          userId: expect.toBeTruthy(),
          updatedAt: expect.toBeTruthy(),
          createdAt: expect.toBeTruthy()
        })
      })
  })
})
import request from 'supertest'
import app from '../../src/app.js'

import factory from '../factories'
import truncate from '../util/truncate.js'

describe('Session', () => {

  beforeEach(async () => {
    await truncate()
  })

  it ('should be login success', async () => {
    const user = await factory.attrs('User', {
      password: '123456'
    })

    const { body } = await request(app).post('/api/users').expect(200).send(user)

    await request(app)
      .post('/api/sessions')
      .expect(200)
      .send({ email: body.email, password: `123456` })
      .then(({ body }) => {
        expect(Object.keys(body).sort()).toEqual(['token', 'user'].sort())
      })

  })

  it ('should be login and failed because not exist user', async () => {
    const { password } = await factory.create('User')

    const response = await request(app)
      .post('/api/sessions')
      .expect(401)
      .send({ email: 'WRONG@WRONG.COM', password })

    expect(response.text).toEqual('{"success":false,"errors":["User not found"]}')
  })

  it('should be login and failed because password dont match', async () => {
    const { email } = await factory.create('User')
    const response = await request(app)
      .post('/api/sessions')
      .expect(401)
      .send({ email, password: 'WRONGPASSWORD' })

    expect(response.text).toEqual('{"success":false,"errors":["Password does not match"]}')
  })
})
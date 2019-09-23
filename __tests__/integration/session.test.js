import request from 'supertest'
import app from '../../src/app.js'

import factory from '../factories'
import truncate from '../util/truncate.js'

describe('Session', () => {
  beforeEach(async () => {
    await truncate()
  })
  it ('should be create user and login', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/api/users')
      .expect(200)
      .send(user).then(({ body }) => {
        expect(Object.keys(body).sort()).toEqual(['name', 'email', 'id'].sort())
      })

    await request(app)
      .post('/api/sessions')
      .expect(200)
      .send({
        email: user.email,
        password: user.password
      }).then(({ body }) => {
        expect(Object.keys(body).sort()).toEqual(['token', 'user'].sort())
      })
  })

  it ('should be login and failed because not exist user', async () => {
    const { email, password } = await factory.attrs('User')
    const response = await request(app)
      .post('/api/sessions')
      .expect(401)
      .send({ email, password })

    expect(response.text).toEqual('{"success":false,"errors":["User not found"]}')
  })

  it('should be login and failed because password dont match', async () => {
    const { user, email, ...rest } = await factory.attrs('User')

    await request(app)
      .post('/api/users')
      .expect(200)
      .send({ user, email, ...rest }).then(({ body }) => {
        expect(Object.keys(body).sort()).toEqual(['name', 'email', 'id'].sort())
      })

    const response = await request(app)
      .post('/api/sessions')
      .expect(401)
      .send({ email, password: 'WRONGPASSWORD' })

    expect(response.text).toEqual('{"success":false,"errors":["Password does not match"]}')
  })
})
import request from 'supertest'
import app from '../../src/app.js'

import factory from '../factories'
import truncate from '../util/truncate.js'

let user = null
describe('Session', () => {

  beforeEach(async () => {
    await truncate()

    user = await factory.attrs('User')
    await request(app)
      .post('/api/users')
      .expect(200)
      .send(user).then(({ body }) => {
        expect(Object.keys(body).sort()).toEqual(['name', 'email', 'id'].sort())
      })
  })

  it ('should be login success', async () => {
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
    const response = await request(app)
      .post('/api/sessions')
      .expect(401)
      .send({ email: 'WRONG@WRONG.COM', password: user.password })

    expect(response.text).toEqual('{"success":false,"errors":["User not found"]}')
  })

  it('should be login and failed because password dont match', async () => {
    const response = await request(app)
      .post('/api/sessions')
      .expect(401)
      .send({ email: user.email, password: 'WRONGPASSWORD' })

    expect(response.text).toEqual('{"success":false,"errors":["Password does not match"]}')
  })
})
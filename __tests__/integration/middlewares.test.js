import faker from 'faker'
import request from 'supertest'
import app from '../../src/app.js'

import factory from '../factories'
import truncate from '../util/truncate'

describe('Middlewares', () => {
  let token = null
  beforeAll(async () => {
    const user = await factory.create('User')
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })
    expect(body).toBeTruthy()

    token = body.token
  })

  it('should be invalid values to store user', async () => {
    const response = await request(app).post('/api/users').expect(400)
    expect(response.text).toEqual('{"success":false,"errors":["birthDay is a required field"]}')
  })

  it('should be invalid values to store session', async () => {
    const response = await request(app).post('/api/sessions').expect(400)
    expect(response.text).toEqual('{"success":false,"errors":["email is a required field"]}')
  })

  it('should be invalid values to store profile', async () => {
    const response = await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${token}`)
    expect(response.text).toEqual('{"success":false,"errors":["name is a required field"]}')
  })

  it('should be invalid token', async () => {
    const nameFake = faker.name.findName()
    const tokenFake = faker.random.uuid()
    const response = await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${tokenFake}`).send({ name: nameFake })
    expect(response.text).toEqual('{"success":false,"errors":["Token invalid"]}')
  })

  it('should be not provider token', async () => {
    const nameFake = faker.name.findName()
    const response = await request(app).post('/api/users/profiles').send({ name: nameFake })
    expect(response.text).toEqual('{"success":false,"errors":["Token not provided"]}')
  })
})

import faker from 'faker'
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
        const { data } = body
        expect(Object.keys(data).sort()).toEqual(['id', 'name', 'userId', 'updatedAt', 'createdAt'].sort())
      })
  })

  it('should be create same profile and get error', async () => {

    const user = await factory.create('User')
    const profile = await factory.attrs('Profile')
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).send(profile)

    const response = await request(app)
      .post('/api/users/profiles')
      .set('Authorization', `Bearer ${body.token}`)
      .send(profile)
      .expect(400)

    expect(response.text).toEqual('{"success":false,"errors":["This profile name already exists"]}')
  })

  it ('should be create 5 profiles and block', async () => {
    const user = await factory.create('User')
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })

    const firstProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(firstProfile)

    const secondProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).send(secondProfile)

    const thirdProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(thirdProfile)

    const fourthProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set(' Authorization', `Bearer ${body.token}`).expect(200).send(fourthProfile)

    const fifthProfile = { name: faker.name.findName() }
    const response = await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(400).send(fifthProfile)

    expect(response.text).toEqual('{"success":false,"errors":["Maximum number of profiles has been reached"]}')
  })

})
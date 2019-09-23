import jwt from 'jsonwebtoken'
import faker from 'faker'
import request from 'supertest'

import app from '../../src/app.js'
import authConfig from '../../src/config/auth'

import factory from '../factories'
import truncate from '../util/truncate.js'

let user = null
describe('Session', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('should be creating profile', async () => {
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

  it('should be wrong when create profile with same name', async () => {

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

  it ('should be wrong when pass token of user not created to create profile', async () => {
    const profile = await factory.attrs('Profile')
    const id = 5000
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    })

    const response = await request(app)
      .post('/api/users/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send(profile)
      .expect(400)

    expect(response.text).toEqual('{"success":false,"errors":["User not found"]}')
  })

  it('should be wrong when pass token of user not created to list profile', async () => {
    const profile = await factory.attrs('Profile')
    const id = 5000
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    })

    const response = await request(app)
      .get('/api/users/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send(profile)
      .expect(400)

    expect(response.text).toEqual('{"success":false,"errors":["User not found"]}')
  })

  it ('should be wrong when created 5 profiles ', async () => {
    const user = await factory.create('User')
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })

    const firstProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(firstProfile)

    const secondProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(secondProfile)

    const thirdProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(thirdProfile)

    const fourthProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(fourthProfile)

    const fifthProfile = { name: faker.name.findName() }
    const response = await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(400).send(fifthProfile)

    expect(response.text).toEqual('{"success":false,"errors":["Maximum number of profiles has been reached"]}')
  })

  it('should be listing profiles by user', async () => {
    const user = await factory.create('User')
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })

    const firstProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(firstProfile)

    const secondProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(secondProfile)

    const thirdProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(thirdProfile)

    const fourthProfile = { name: faker.name.findName() }
    await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(fourthProfile)

    await request(app)
      .get('/api/users/profiles')
      .set('Authorization', `Bearer ${body.token}`)
      .expect(200)
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(data).toHaveLength(4)
      })
  })

  it('should be deleting profile', async () => {
    const user = await factory.create('User')
    const profile = { name: faker.name.findName() }
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })
    const response = await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${body.token}`).expect(200).send(profile)
    expect(response.body).toBeTruthy()

    const profileId = response.body.data.id
    await request(app).delete(`/api/users/profiles/${profileId}`)
    .set('Authorization', `Bearer ${body.token}`)
    .expect(200)
    .send(profile)
    .then(({ body }) => {
      const { success, data } = body
      expect(success).toBeTruthy()
      expect(Object.keys(data).sort()).toEqual(['id', 'name', 'userId', 'createdAt', 'updatedAt'].sort())
    })
  })

  it('should be wrong when pass non-existent id ', async () => {
    const user = await factory.create('User')
    const profile = { name: faker.name.findName() }
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })

    const profileId = 800
    const response = await request(app).delete(`/api/users/profiles/${profileId}`)
      .set('Authorization', `Bearer ${body.token}`)
      .expect(400)
      .send(profile)

    expect(response.text).toEqual('{"success":false,"errors":["Profile not found"]}')
  })
})
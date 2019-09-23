import request from 'supertest'
import app from '../../src/app.js'

import User from '../../src/app/models/User'

import bcrypt from 'bcryptjs'
import factory from '../factories'
import truncate from '../util/truncate'

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const userModel = new User()

    const compareHash = await userModel.checkPassword(user.password)

    expect(compareHash).toBe(true)
  })

  it('should be able to register', async () => {
    const user = await factory.attrs('User')

    await request(app)
      .post('/api/users')
      .expect(200)
      .send(user).then(({ body }) => {
        expect(Object.keys(body).sort()).toEqual(['name', 'email', 'id'].sort())
      })
  })

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User')
    await request(app)
      .post('/api/users')
      .expect(200)
      .send(user)

    await request(app)
      .post('/api/users')
      .expect(400)
      .send(user)
  })
})

import faker from 'faker'
import request from 'supertest'

import app from '../../src/app.js'

import factory from '../factories'
import truncate from '../util/truncate.js'

describe('Watched', () => {
  let token = null
  let profileId = null
  const URL = '/api/movies'

  beforeAll(async () => {
    await truncate()

    const user = await factory.create('User')
    const profile = await factory.attrs('Profile')
    const { body } = await request(app).post('/api/sessions').send({ email: user.email, password: user.password })
    expect(body).toBeTruthy()

    token = body.token
    expect(token).toBeTruthy()
    const newProfile = await request(app).post('/api/users/profiles').set('Authorization', `Bearer ${token}`).expect(200).send(profile)
    profileId = newProfile.body.data.id
    expect(profileId).toBeTruthy()
  })

  it ('should be add a new movie to my list with value watched', async () => {
    const movie = await factory.attrs('Movie', {
      watched: true
    })

    await request(app)
      .put(`${URL}/${profileId}/watched/${movie.movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .send(movie)
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(Object.keys(data).sort())
          .toEqual(['id', 'genres', 'details', 'movieId', 'movieName', 'wantWatch', 'watched', 'profileId', 'updatedAt', 'createdAt'].sort())
        expect(Number(data.profileId)).toEqual(profileId)
        expect(data.movieId).toEqual(movie.movieId)
        expect(data.watched).toBeTruthy()
      })
  })

  it('should be update watched movie to falsy', async () => {
    const movie = await factory.attrs('Movie', {
      movieId: faker.random.number(),
      watched: true
    })

    await request(app).put(`${URL}/${profileId}/watched/${movie.movieId}`).set('Authorization', `Bearer ${token}`).send(movie)

    await request(app)
      .put(`${URL}/${profileId}/watched/${movie.movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .send({ ...movie, watched: false })
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(Object.keys(data).sort())
          .toEqual(['id', 'genres', 'details', 'movieId', 'movieName', 'wantWatch', 'watched', 'profileId', 'scheduleTo', 'updatedAt', 'createdAt'].sort())
        expect(Number(data.profileId)).toEqual(profileId)
        expect(data.movieId).toEqual(movie.movieId)
        expect(data.watched).toBeFalsy()
      })
  })
})
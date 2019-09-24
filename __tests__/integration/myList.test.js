import faker from 'faker'
import request from 'supertest'

import app from '../../src/app.js'
import factory from '../factories'
import truncate from '../util/truncate.js'

let token = null
let profileId = null
const URL = '/api/movies'
describe('My List', () => {
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

  it('should be add movie in list', async () => {
    const movie = await factory.attrs('Movie')

    await request(app)
      .post(`${URL}/${profileId}/myList`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .send(movie)
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(Object.keys(data).sort())
        .toEqual(['id', 'genres', 'details', 'movieId', 'movieName', 'wantWatch', 'watched', 'profileId', 'updatedAt', 'createdAt'].sort())
        expect(Number(data.profileId)).toEqual(profileId)
      })
  })

    it('should be updated to "want watch" when movie exist in list', async () => {
    const movie = await factory.attrs('Movie')

    await request(app)
      .post(`${URL}/${profileId}/myList`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .send(movie)
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(Object.keys(data).sort())
          .toEqual(['id', 'genres', 'details', 'movieId', 'movieName', 'wantWatch', 'watched', 'profileId', 'scheduleTo', 'updatedAt', 'createdAt'].sort())
        expect(Number(data.profileId)).toEqual(profileId)
        expect(data.movieId).toEqual(movie.movieId)
        expect(data.wantWatch).toBeTruthy()
      })
  })

  it ('should be show my list', async () => {
    await request(app)
      .get(`${URL}/${profileId}/myList`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(data).toBeTruthy()
      })
  })

  it('should be update "want watch" to false if movie is watched', async () => {
    const movie = await factory.attrs('Movie', {
      movieId: faker.random.number(),
      watched: true
    })

    await request(app).post(`${URL}/${profileId}/myList`).set('Authorization', `Bearer ${token}`).send(movie)

    await request(app)
      .delete(`${URL}/${profileId}/myList/${movie.movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(Object.keys(data).sort())
          .toEqual(['id', 'genres', 'details', 'movieId', 'movieName', 'wantWatch', 'watched', 'profileId', 'scheduleTo', 'updatedAt', 'createdAt'].sort())
        expect(data.wantWatch).toBeFalsy()
        expect(data.movieId).toEqual(movie.movieId)
        expect(Number(data.profileId)).toEqual(profileId)
      })
  })

  it ('should be delete movie from my list', async () => {
    const movie = await factory.attrs('Movie')

    await request(app)
      .delete(`${URL}/${profileId}/myList/${movie.movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        const { success, data } = body
        expect(success).toBeTruthy()
        expect(Object.keys(data).sort())
          .toEqual(['id', 'genres', 'details', 'movieId', 'movieName', 'wantWatch', 'watched', 'profileId', 'scheduleTo', 'updatedAt', 'createdAt'].sort())
        expect(data.movieId).toEqual(movie.movieId)
        expect(Number(data.profileId)).toEqual(profileId)
      })
  })

  it('should be wrong when delete movie not exist in list', async () => {
    const movie = await factory.attrs('Movie', {
      movieId: 2357239572359
    })

    const response = await request(app)
      .delete(`${URL}/${profileId}/myList/${movie.movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    expect(response.text).toEqual('{"success":false,"errors":["Movie not found in list"]}')
  })
})
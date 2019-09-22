import { Router } from 'express'

import UserController from './app/controllers/User'
import SessionController from './app/controllers/Session'
import ProfileController from './app/controllers/Profile'
import MovieMyListController from './app/controllers/MovieMyList'

import authMiddleware from './app/middlewares/auth'
import validations from './app/middlewares/validations'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Is Ok' })
})

// User
const usersRoute = '/users'
routes.post(`${usersRoute}`, validations.User.store, UserController.store)

// Session
const sessionRoute = '/sessions'
routes.post(`${sessionRoute}`, validations.Session.store, SessionController.store)

// Middleware Auth
routes.use(authMiddleware)

// Profile
const profileRoute = '/users/profiles'
routes.get(`${profileRoute}`, ProfileController.index)
routes.post(`${profileRoute}`, validations.Profile.store, ProfileController.store)
routes.delete(`${profileRoute}/:profileId`, validations.Profile.delete, ProfileController.delete)

// Movie
const movieRoute = '/movies/:profileId'
routes.get(`${movieRoute}/myList`, MovieMyListController.index)
routes.post(`${movieRoute}/myList`, MovieMyListController.store)
routes.delete(`${movieRoute}/myList/:movieId`, MovieMyListController.delete)

export default routes

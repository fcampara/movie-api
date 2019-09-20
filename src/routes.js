import { Router } from 'express'

import UserController from './app/controllers/User'
import SessionController from './app/controllers/Session'
import ProfileController from './app/controllers/Profile'

import authMiddleware from './app/middlewares/auth'
import validations from './app/middlewares/validations'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Is Ok' })
})

// User
const usersRoutes = '/users'
routes.post(`${usersRoutes}`, validations.User.store, UserController.store)

// Session
const sessionRoutes = '/sessions'
routes.post(`${sessionRoutes}`, validations.Session.store, SessionController.store)

// Middleware Auth
routes.use(authMiddleware)

// Profile
const profileRoutes = '/users/profiles'
routes.get(`${profileRoutes}`, ProfileController.index)
routes.post(`${profileRoutes}`, validations.Profile.store, ProfileController.store)
routes.delete(`${profileRoutes}/:profileId`, validations.Profile.delete, ProfileController.delete)

export default routes

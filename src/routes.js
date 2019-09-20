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
routes.post('/users', validations.User.store, UserController.store)

// Session
routes.post('/sessions', validations.Session.store, SessionController.store)

// Need Auth
routes.use(authMiddleware)

// Profile
routes.post('/users/profile', validations.Profile.store, ProfileController.store)

export default routes

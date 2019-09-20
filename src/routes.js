import { Router } from 'express'

import UserController from './app/controllers/User'
import SessionController from './app/controllers/Session'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Is Ok' })
})

// User
routes.post('/users', UserController.store)

// Session
routes.post('/sessions', SessionController.store)

// Need Auth
routes.use(authMiddleware)

routes.get('/auth', (req, res) => {
  res.json('Auth')
})

export default routes

import User from '../models/User'
import UserValidation from '../middlewares/validation/User'

class UserController {
  async store (req, res) {
    try {
      const { data: user } = await UserValidation.store(req.body)
      const userExists = await User.findOne({ where: { email: user.email } })
      if (userExists) return res.status(400).json({ success: false, errors: ['User already exists.'] })

      const { id, name, email } = await User.create(user)

      return res.json({ id, name, email })
    } catch (errors) {
      return res.status(500).json(errors)
    }
  }
}

export default new UserController()

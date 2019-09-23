import User from '../models/User'

class UserController {
  async store (req, res) {
    const user = req.body

    const userExists = await User.findOne({ where: { email: user.email } })
    if (userExists) return res.status(400).json({ success: false, errors: ['User already exists.'] })

    const { id, name, email } = await User.create(user)

    return res.json({ id, name, email })
  }
}

export default new UserController()

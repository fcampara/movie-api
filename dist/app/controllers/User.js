"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store (req, res) {
    const user = req.body

    const userExists = await _User2.default.findOne({ where: { email: user.email } })
    if (userExists) return res.status(400).json({ success: false, errors: ['User already exists.'] })

    const { id, name, email } = await _User2.default.create(user)

    return res.json({ id, name, email })
  }
}

exports. default = new UserController()

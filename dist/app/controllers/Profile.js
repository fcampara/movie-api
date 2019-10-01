"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Profile = require('../models/Profile'); var _Profile2 = _interopRequireDefault(_Profile);

class ProfileController {
  async index (req, res) {
    const { userId } = req
    const user = await _User2.default.findByPk(userId)

    if (!user) return res.status(400).json({ success: false, errors: ['User not found'] })

    const profiles = await _Profile2.default.findAll({
      where: { user_id: userId },
      attributes: ['id', 'name']
    })

    return res.json({ success: true, data: profiles })
  }

  async store (req, res) {
    const { name } = req.body
    const { userId } = req
    const user = await _User2.default.findByPk(userId)

    if (!user) return res.status(400).json({ success: false, errors: ['User not found'] })

    const profiles = await _Profile2.default.findAll({ where: { user_id: userId } })

    if (!profiles.length) {
      const newProfile = await _Profile2.default.create({ name: name, userId })
      return res.json({ success: true, data: newProfile })
    }

    if (profiles.length === 4) return res.status(400).json({ success: false, errors: ['Maximum number of profiles has been reached'] })

    const hasSameName = profiles.some(profile => profile.name === name)

    if (hasSameName) return res.status(400).json({ success: false, errors: ['This profile name already exists'] })

    const newProfile = await _Profile2.default.create({ name: name, userId })
    return res.status(200).json({ success: true, data: newProfile })
  }

  async delete (req, res) {
    const { profileId } = req.params

    const profile = await _Profile2.default.findByPk(profileId)

    if (!profile) return res.status(400).json({ success: false, errors: ['Profile not found'] })

    const deleted = await profile.destroy()

    return res.json({ success: true, data: deleted })
  }
}

exports. default = new ProfileController()

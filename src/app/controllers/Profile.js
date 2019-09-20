import User from '../models/User'
import Profile from '../models/Profile'

class ProfileController {
  async store (req, res) {
    const { name } = req.body
    const { userId } = req
    const user = await User.findByPk(userId)

    if (!user) return res.status(400).json({ success: false, errors: ['User not found'] })

    const profiles = await Profile.findAll({ where: { user_id: userId } })

    if (!profiles.length) {
      const newProfile = await Profile.create({ name: name, userId })
      return res.json({ success: true, data: newProfile })
    }

    if (profiles.length === 4) return res.status(400).json({ success: false, errors: ['Maximum number of profiles has been reached'] })

    const hasSameName = profiles.some(profile => profile.name === name)

    if (hasSameName) return res.status(400).json({ success: false, errors: ['This profile name already exists'] })

    const newProfile = await Profile.create({ name: name, userId })
    return res.status(200).json({ success: true, data: newProfile })
  }
}

export default new ProfileController()

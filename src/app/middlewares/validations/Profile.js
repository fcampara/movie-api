import * as Yup from 'yup'
import { getErrors } from '../../../utils/errors'

class UserValidation {
  async store (req, res, next) {
    const profile = req.body
    const schema = Yup.object().shape({
      name: Yup.string().required()
    })

    try {
      await schema.validate(profile)
      return next()
    } catch (err) {
      const errors = getErrors(err)
      return res.status(400).json({ success: false, errors })
    }
  }
}

export default new UserValidation()

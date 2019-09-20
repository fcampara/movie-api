import * as Yup from 'yup'
import { getErrors } from '../../../utils/errors'

class UserValidation {
  async store (req, res, next) {
    const session = req.body
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      email: Yup.string().email().required()
    })

    try {
      await schema.validate(session)
      return next()
    } catch (err) {
      const errors = getErrors(err)
      return res.status(400).json({ success: false, errors })
    }
  }
}

export default new UserValidation()

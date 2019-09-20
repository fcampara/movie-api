import * as Yup from 'yup'

class UserValidation {
  store (user) {
    return new Promise((resolve, reject) => {
      const schema = Yup.object().shape({
        password: Yup.string().required(),
        email: Yup.string().email().required()
      })

      schema.validate(user).then((data) => {
        resolve({ success: true, data })
      }).catch((err) => {
        const errors = err.errors.map((error) => error)
        reject({ success: false, errors })
      })
    })
  }
}

export default new UserValidation()

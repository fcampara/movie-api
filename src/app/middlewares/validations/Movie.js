import * as Yup from 'yup'
import { getErrors } from '../../../utils/errors'

class MovieValidation {
  async store (req, res, next) {
    const { profileId } = req.params
    const schema = Yup.object().shape({
      profileId: Yup.number().positive().integer().required(),
      details: Yup.object().required().shape({
        posterPath: Yup.string(),
        voteAverage: Yup.number(),
        realeaseDate: Yup.date(),
        overview: Yup.string()
      }),
      genres: Yup.array(),
      movieId: Yup.number().required(),
      movieName: Yup.string().required(),
      wantWatch: Yup.boolean().required()
    })

    try {
      await schema.validate({
        profileId,
        ...req.body
      })
      return next()
    } catch (err) {
      const errors = getErrors(err)
      return res.status(400).json({ success: false, errors })
    }
  }
}

export default new MovieValidation()

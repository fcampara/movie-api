
import MovieModel from '../models/Movie'

class MovieMyListController {
  async index (req, res) {
    const { profileId } = req.params

    const movies = await MovieModel.findAll({
      where: { profile_id: profileId }
    })

    res.json({ success: true, data: movies })
  }

  async store (req, res) {
    const { profileId } = req.params
    const { movieId } = req.body

    const movie = await MovieModel.findOne({
      where: { profile_id: profileId, movie_id: movieId }
    })

    if (movie) return res.status(500).json({ success: false, errors: ['Already exist this movie in list'] })

    const newMovie = await MovieModel.create({ ...req.body, profileId })

    res.json({ success: true, data: newMovie })
  }
}

export default new MovieMyListController()

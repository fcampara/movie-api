
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

    if (movie) {
      const newMovie = await movie.update({ wantWatch: true })
      return res.json({ success: true, data: newMovie })
    }

    const newMovie = await MovieModel.create({ ...req.body, profileId, wantWatch: true })

    res.json({ success: true, data: newMovie })
  }

  async delete (req, res) {
    const { profileId, movieId } = req.params

    const movie = await MovieModel.findOne({
      where: { profile_id: profileId, movie_id: movieId }
    })

    if (!movie) return res.status(400).json({ success: false, errors: ['Movie not found in list'] })

    if (movie.watched) {
      const newMovie = await movie.update({ wantWatch: false })
      return res.json({ success: true, data: newMovie })
    }

    const deleted = await movie.destroy()

    return res.json({ success: true, data: deleted })
  }
}

export default new MovieMyListController()

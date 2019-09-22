import MovieModel from '../models/Movie'

class WatchedController {
  async store (req, res) {
    const { profileId, movieId } = req.params
    const { watched } = req.body

    const movie = await MovieModel.findOne({
      where: { profile_id: profileId, movie_id: movieId }
    })

    if (!movie) {
      const newMovie = await MovieModel.create({ ...req.body, watched: true, profileId })
      return res.json({ success: true, data: newMovie })
    }

    const newMovie = await movie.update({ watched })

    return res.json({ success: true, data: newMovie })
  }
}

export default new WatchedController()

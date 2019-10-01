"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Movie = require('../models/Movie'); var _Movie2 = _interopRequireDefault(_Movie);

class MovieMyListController {
  async index (req, res) {
    const { profileId } = req.params

    const movies = await _Movie2.default.findAll({
      where: { profile_id: profileId }
    })

    res.json({ success: true, data: movies })
  }

  async store (req, res) {
    const { profileId } = req.params
    const { movieId } = req.body

    const movie = await _Movie2.default.findOne({
      where: { profile_id: profileId, movie_id: movieId }
    })

    if (movie) {
      const newMovie = await movie.update({ wantWatch: true })
      return res.json({ success: true, data: newMovie })
    }

    const newMovie = await _Movie2.default.create({ ...req.body, profileId, wantWatch: true })

    res.json({ success: true, data: newMovie })
  }

  async delete (req, res) {
    const { profileId, movieId } = req.params

    const movie = await _Movie2.default.findOne({
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

exports. default = new MovieMyListController()

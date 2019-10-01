"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Movie = require('../models/Movie'); var _Movie2 = _interopRequireDefault(_Movie);

class WatchedController {
  async store (req, res) {
    const { profileId, movieId } = req.params
    const { watched } = req.body

    const movie = await _Movie2.default.findOne({
      where: { profile_id: profileId, movie_id: movieId }
    })

    if (!movie) {
      const newMovie = await _Movie2.default.create({ ...req.body, watched: true, profileId })
      return res.json({ success: true, data: newMovie })
    }

    if (!movie.wantWatch && !watched) {
      const deleted = await movie.destroy()
      return res.json({ success: true, data: deleted })
    }

    const newMovie = await movie.update({ watched })

    return res.json({ success: true, data: newMovie })
  }
}

exports. default = new WatchedController()

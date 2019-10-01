"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Movie extends _sequelize.Model {
  static init (sequelize) {
    super.init(
      {
        movieId: _sequelize2.default.INTEGER,
        movieName: _sequelize2.default.STRING,
        watched: _sequelize2.default.BOOLEAN,
        genres: _sequelize2.default.ARRAY(_sequelize2.default.STRING),
        wantWatch: _sequelize2.default.BOOLEAN,
        profileId: _sequelize2.default.INTEGER,
        scheduleTo: _sequelize2.default.DATE,
        details: _sequelize2.default.JSONB
      },
      {
        sequelize
      }
    )

    return this
  }
}

exports. default = Movie

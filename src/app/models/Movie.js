import Sequelize, { Model } from 'sequelize'

class Movie extends Model {
  static init (sequelize) {
    super.init(
      {
        movieId: Sequelize.INTEGER,
        movieName: Sequelize.STRING,
        watched: Sequelize.BOOLEAN,
        genres: Sequelize.ARRAY(Sequelize.STRING),
        wantWatch: Sequelize.BOOLEAN,
        profileId: Sequelize.INTEGER,
        scheduleTo: Sequelize.DATE,
        details: Sequelize.JSONB
      },
      {
        sequelize
      }
    )

    return this
  }
}

export default Movie

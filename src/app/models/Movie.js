import Sequelize, { Model } from 'sequelize'

class Movie extends Model {
  static init (sequelize) {
    super.init(
      {
        movieName: Sequelize.STRING,
        watched: Sequelize.BOOLEAN,
        wantWatch: Sequelize.BOOLEAN,
        scheduleTo: Sequelize.DATE
      },
      {
        sequelize
      }
    )

    return this
  }
}

export default Movie

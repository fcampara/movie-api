import Sequelize, { Model } from 'sequelize'

class Profile extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        userId: Sequelize.INTEGER
      },
      {
        sequelize
      }
    )

    return this
  }
}

export default Profile

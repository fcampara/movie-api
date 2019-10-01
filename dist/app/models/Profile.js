"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Profile extends _sequelize.Model {
  static init (sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        userId: _sequelize2.default.INTEGER
      },
      {
        sequelize
      }
    )

    return this
  }
}

exports. default = Profile

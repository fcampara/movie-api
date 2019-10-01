"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Movie = require('../app/models/Movie'); var _Movie2 = _interopRequireDefault(_Movie);
var _Profile = require('../app/models/Profile'); var _Profile2 = _interopRequireDefault(_Profile);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _Movie2.default, _Profile2.default]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new (0, _sequelize2.default)(_database2.default)

    models.map(model => model.init(this.connection))
  }
}

exports. default = new Database()

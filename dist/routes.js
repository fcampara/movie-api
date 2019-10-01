"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

var _User = require('./app/controllers/User'); var _User2 = _interopRequireDefault(_User);
var _Session = require('./app/controllers/Session'); var _Session2 = _interopRequireDefault(_Session);
var _Profile = require('./app/controllers/Profile'); var _Profile2 = _interopRequireDefault(_Profile);
var _MovieMyList = require('./app/controllers/MovieMyList'); var _MovieMyList2 = _interopRequireDefault(_MovieMyList);
var _Watched = require('./app/controllers/Watched'); var _Watched2 = _interopRequireDefault(_Watched);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _validations = require('./app/middlewares/validations'); var _validations2 = _interopRequireDefault(_validations);

const routes = new (0, _express.Router)()

routes.get('/', (req, res) => {
  res.json({ message: 'Is alive!' })
})

// User
const usersRoute = '/users'
routes.post(`${usersRoute}`, _validations2.default.User.store, _User2.default.store)

// Session
const sessionRoute = '/sessions'
routes.post(`${sessionRoute}`, _validations2.default.Session.store, _Session2.default.store)

// Middleware Auth
routes.use(_auth2.default)

// Profile
const profileRoute = '/users/profiles'
routes.get(`${profileRoute}`, _Profile2.default.index)
routes.post(`${profileRoute}`, _validations2.default.Profile.store, _Profile2.default.store)
routes.delete(`${profileRoute}/:profileId`, _Profile2.default.delete)

// Movie
const movieRoute = '/movies/:profileId'
routes.get(`${movieRoute}/myList`, _MovieMyList2.default.index)
routes.post(`${movieRoute}/myList`, _validations2.default.Movie.store, _MovieMyList2.default.store)
routes.delete(`${movieRoute}/myList/:movieId`, _MovieMyList2.default.delete)

routes.put(`${movieRoute}/watched/:movieId`, _Watched2.default.store)

exports. default = routes

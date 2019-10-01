"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _errors = require('../../../utils/errors');

class UserValidation {
  async store (req, res, next) {
    const profile = req.body
    const schema = Yup.object().shape({
      name: Yup.string().required()
    })

    try {
      await schema.validate(profile)
      return next()
    } catch (err) {
      const errors = _errors.getErrors.call(void 0, err)
      return res.status(400).json({ success: false, errors })
    }
  }
}

exports. default = new UserValidation()

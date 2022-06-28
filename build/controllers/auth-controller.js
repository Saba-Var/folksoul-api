"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authentication = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authentication = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const currentUser = await _User.default.findOne({
      username
    });
    if (!currentUser) return res.status(404).json({
      message: 'მომხმარებელი ვერ მოიძებნა'
    });
    const isMatch = await _bcryptjs.default.compare(password, currentUser.password);

    if (isMatch && process.env.ACCESS_TOKEN_SECRET) {
      const accessToken = _jsonwebtoken.default.sign({
        username,
        password
      }, process.env.ACCESS_TOKEN_SECRET);

      return res.status(200).json({
        token: accessToken
      });
    }

    return res.status(404).json({
      message: 'მომხმარებლის მონაცემები არასწორია!'
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

exports.authentication = authentication;
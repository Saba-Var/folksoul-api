"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authMiddleware = async (req, res, next) => {
  try {
    const secretText = process.env.ACCESS_TOKEN_SECRET;

    if (secretText) {
      const {
        authorization
      } = req.headers;
      if (!authorization) return res.status(401).json({
        message: 'missing authorization header'
      });
      const token = authorization.trim().split(' ')[1];
      let verified;
      verified = _jsonwebtoken.default.verify(token, secretText);
      if (verified) return next();
      return res.status(401).json({
        message: 'User is not authorized'
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: 'Token is not valid'
    });
  }
};

var _default = authMiddleware;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateLocalMongoURL = () => {
  const {
    MONGO_PROTOCOL,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE
  } = process.env;
  return `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
};

const generateAtlasMongoURL = () => {
  const {
    MONGO_PROTOCOL,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE
  } = process.env;
  return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`;
};

const shouldConnectToLocalDatabase = () => process.env.MONGO_PROTOCOL === 'mongodb';

const connect = async () => {
  try {
    const connectionURL = shouldConnectToLocalDatabase() ? generateLocalMongoURL() : generateAtlasMongoURL();
    return _mongoose.default.connect(connectionURL);
  } catch (e) {
    throw new Error(e.message);
  }
};

var _default = connect;
exports.default = _default;
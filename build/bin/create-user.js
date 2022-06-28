"use strict";

var _mongo = _interopRequireDefault(require("../config/mongo"));

var _User = _interopRequireDefault(require("../models/User"));

var _readline = _interopRequireDefault(require("readline"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readLine = _readline.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createUser = () => {
  _dotenv.default.config();

  (async () => {
    let mongoose = null;
    mongoose = await (0, _mongo.default)();

    try {
      const username = process.env.USER_USERNAME;
      let password;

      if (process.env.USER_PASSWORD && username) {
        if (process.env.USER_PASSWORD.length < 3) throw new Error('Password should be 3 characters long');
        password = await _bcryptjs.default.hash(process.env.USER_PASSWORD, 12);
        if (username.length < 3) throw new Error('username should be 3 characters long');

        for (let i = 0; i < username.length; i++) {
          if (username[i] === username[i].toUpperCase()) {
            throw new Error('Username should include only lowercase letters and symbols');
          }
        }
      }

      await _User.default.create({
        username,
        password
      });
      console.log('user created successfully');
    } catch (error) {
      console.log(error.message);
    }

    await mongoose.connection.close();
  })();
};

readLine.question(`username: `, username => {
  process.env.USER_USERNAME = username;
  readLine.question(`password: `, password => {
    process.env.USER_PASSWORD = password;
    readLine.close();
    createUser();
  });
});
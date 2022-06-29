"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBandAbout = void 0;

var _Band = _interopRequireDefault(require("../models/Band"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getBandAbout = async (_req, res) => {
  try {
    let existingBand = await _Band.default.find();
    if (existingBand.length === 0) await _Band.default.create({
      about: 'ბენდის შესახებ ინფორმაცია არ არის დამატებული'
    });
    return res.status(200).json(await _Band.default.find().select('-__v'));
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getBandAbout = getBandAbout;
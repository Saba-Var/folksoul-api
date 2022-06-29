"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.uploadBandPhoto = exports.getBandAbout = exports.changeBandAbout = void 0;

var _multerProperties = require("../util/multerProperties");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Band = _interopRequireDefault(require("../models/Band"));

var _multer = _interopRequireDefault(require("multer"));

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

const changeBandAbout = async (req, res) => {
  try {
    const id = {
      _id: new _mongoose.default.Types.ObjectId(req.body.id)
    };
    const band = await _Band.default.findOne(id);
    if (!band) return res.status(404).json({
      message: 'ბენდი ჯერ არ არსებობს'
    });
    band.about = req.body.about;
    await band.save();
    return res.status(200).json({
      message: 'ბენდის ინფორმაცია წარმატებით შეიცვალა!'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.changeBandAbout = changeBandAbout;
const upload = (0, _multer.default)({
  storage: (0, _multerProperties.multerStorage)('band'),
  fileFilter: (0, _multerProperties.multerFilter)(_Band.default, 'ბენდი')
});
const uploadBandPhoto = upload.single('image');
exports.uploadBandPhoto = uploadBandPhoto;

const uploadImage = async (req, res) => {
  try {
    const id = {
      _id: new _mongoose.default.Types.ObjectId(req.body.id)
    };
    const band = await _Band.default.findOne(id);
    if (!band) return res.status(404).json({
      message: 'ბენდი ვერ მოიძებნა'
    });
    if (req.body.fileValidationError) return res.status(422).json({
      message: 'ატვირთეთ მხოლოდ სურათი!'
    });

    if (req.file) {
      band.image = req.file.path.substring(7);
      await band.save();
      return res.status(201).json({
        message: 'ბენდის სურათი წარმატებით აიტვირთა'
      });
    } else return res.status(422).json({
      message: 'ატვირთეთ ბენდის სურათი'
    });
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};

exports.uploadImage = uploadImage;
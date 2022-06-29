"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.uploadBandPhoto = exports.getBandAbout = exports.changeBandAbout = void 0;

var _multerProperties = require("../util/multerProperties");

var _deleteFile = _interopRequireDefault(require("../util/deleteFile"));

var _Band = _interopRequireDefault(require("../models/Band"));

var _multer = _interopRequireDefault(require("multer"));

var _fs = _interopRequireDefault(require("fs"));

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
    const band = await _Band.default.findOne();

    if (band) {
      band.about = req.body.about;
      await band.save();
      return res.status(200).json({
        message: 'ბენდის ინფორმაცია წარმატებით შეიცვალა!'
      });
    } else return res.status(404).json({
      message: 'ბენდი ჯერ არ არსებობს'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.changeBandAbout = changeBandAbout;

const multerFilter = async (req, file, cb) => {
  try {
    const band = await _Band.default.findOne();

    if (!band) {
      req.body.fileValidationError = `ბენდი ვერ მოიძებნა`;
      return cb(null, false, req.fileValidationError);
    }

    if (file.mimetype.startsWith('image') && band) {
      if (_fs.default.existsSync(`public/${band === null || band === void 0 ? void 0 : band.image}`) && band.image) (0, _deleteFile.default)(`public/${band === null || band === void 0 ? void 0 : band.image}`);
      cb(null, true);
    }

    if (!file.mimetype.startsWith('image')) {
      req.body.fileValidationError = 'ატვირთეთ მხოლოდ სურათი!';
      return cb(null, false, req.fileValidationError);
    }
  } catch (error) {
    return req.body.fileValidationError = 'სურათი ვერ აიტვირთა!';
  }
};

const upload = (0, _multer.default)({
  storage: (0, _multerProperties.multerStorage)('band'),
  fileFilter: multerFilter
});
const uploadBandPhoto = upload.single('image');
exports.uploadBandPhoto = uploadBandPhoto;

const uploadImage = async (req, res) => {
  try {
    const band = await _Band.default.findOne();
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
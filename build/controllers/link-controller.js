"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadLinkPhoto = exports.uploadImage = exports.getAllLinks = exports.deleteLink = exports.changeLink = exports.addLink = void 0;

var _multerProperties = require("../util/multerProperties");

var _deleteFile = _interopRequireDefault(require("../util/deleteFile"));

var _Link = _interopRequireDefault(require("../models/Link"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAllLinks = async (_req, res) => {
  try {
    const links = await _Link.default.find().select('-__v');
    if (links.length === 0) return res.status(200).json([]);
    return res.status(200).json(links);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllLinks = getAllLinks;

const addLink = async (req, res) => {
  try {
    const {
      linkName,
      url
    } = req.body;
    const existingLink = await _Link.default.findOne({
      linkName
    });
    if (existingLink) return res.status(400).json({
      message: `სოციალური ბმული '${linkName}' უკვე არსებობს`
    });
    await _Link.default.create({
      linkName,
      url
    });
    return res.status(201).json({
      message: 'სოციალური ბმული წარმატებით შეინახა!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.addLink = addLink;

const deleteLink = async (req, res) => {
  try {
    const id = {
      _id: new _mongoose.default.Types.ObjectId(req.body.id)
    };
    const link = await _Link.default.findOne(id);
    if (!link) return res.status(404).json({
      message: 'სოციალური ბმული ვერ მოიძებნა'
    });
    if (link.image) (0, _deleteFile.default)(`public/${link.image}`);
    await _Link.default.deleteOne(id);
    return res.status(200).json({
      message: 'სოციალური ბმული წაიშალა!'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'მიუთითეთ ვალიდური id-ის ფორმატი'
    });
  }
};

exports.deleteLink = deleteLink;

const changeLink = async (req, res) => {
  try {
    const {
      id,
      linkName,
      url
    } = req.body;
    const link = await _Link.default.findById(new _mongoose.default.Types.ObjectId(id)).select('-__v');
    if (!link) return res.status(404).json({
      message: 'სოციალური ბმული ვერ მოიძებნა'
    });
    link.linkName = linkName;
    link.url = url;
    await link.save();
    return res.status(200).json({
      message: 'სოციალური ბმულის ინფორმაცია შეიცვალა'
    });
  } catch (err) {
    return res.status(409).json({
      message: `'${req.body.linkName}' უკვე დამატებულია!`
    });
  }
};

exports.changeLink = changeLink;
const upload = (0, _multer.default)({
  storage: (0, _multerProperties.multerStorage)('social-links'),
  fileFilter: (0, _multerProperties.multerFilter)(_Link.default, 'სოციალური ბმული')
});
const uploadLinkPhoto = upload.single('image');
exports.uploadLinkPhoto = uploadLinkPhoto;

const uploadImage = async (req, res) => {
  try {
    const currentLink = await _Link.default.findById(req.body.id);
    if (!currentLink) return res.status(404).json({
      message: 'სოციალური ბმული ვერ მოიძებნა'
    });
    if (req.body.fileValidationError) return res.status(422).json({
      message: 'ატვირთეთ მხოლოდ სურათი!'
    });

    if (req.file) {
      currentLink.image = req.file.path.substring(7);
      await currentLink.save();
      return res.status(201).json({
        message: 'სოციალური ბმული წარმატებით აიტვირთა'
      });
    } else return res.status(422).json({
      message: 'ატვირთეთ სოციალური ბმულის სურათი'
    });
  } catch (error) {
    return res.status(422).json({
      message: 'სოციალური ბმულის id არ არის ვალიდური'
    });
  }
};

exports.uploadImage = uploadImage;
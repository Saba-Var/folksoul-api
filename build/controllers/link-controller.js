"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadLinkPhoto = exports.uploadImage = exports.getAllLinks = exports.deleteLink = exports.changeLink = exports.addLink = void 0;

var _file2 = _interopRequireDefault(require("../util/file"));

var _Link = _interopRequireDefault(require("../models/Link"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _multer = _interopRequireDefault(require("multer"));

var _fs = _interopRequireDefault(require("fs"));

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
    if (link.image) (0, _file2.default)(`public/${link.image}`);
    await _Link.default.deleteOne(id);
    return res.status(200).json({
      message: 'სოციალური ბმული წაიშალა!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
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

const multerStorage = _multer.default.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/images/social-links');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.id}-${new Date().toISOString()}.${ext}`);
  }
});

const multerFilter = async (req, file, cb) => {
  try {
    if (req.body.id.length !== 24) {
      req.body.fileValidationError = 'id უნდა შეიცავდეს 24 სიმბოლოს';
      return cb(null, false, req.fileValidationError);
    }

    const currentLink = await _Link.default.findById(req.body.id);

    if (!currentLink) {
      req.body.fileValidationError = 'სოციალური ბმული ვერ მოიძებნა';
      return cb(null, false, req.fileValidationError);
    }

    if (file.mimetype.startsWith('image') && currentLink) {
      if (_fs.default.existsSync(`public/${currentLink === null || currentLink === void 0 ? void 0 : currentLink.image}`) && currentLink.image) (0, _file2.default)(`public/${currentLink === null || currentLink === void 0 ? void 0 : currentLink.image}`);
      cb(null, true);
    }

    if (!file.mimetype.startsWith('image')) {
      req.body.fileValidationError = 'ატვირთეთ მხოლოდ სურათი!';
      return cb(null, false, req.fileValidationError);
    }
  } catch (error) {
    req.body.fileValidationError = 'სურათი ვერ აიტვირთა!';
  }
};

const upload = (0, _multer.default)({
  storage: multerStorage,
  fileFilter: multerFilter
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
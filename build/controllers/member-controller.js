"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadMemberPhoto = exports.uploadImage = exports.getOneMember = exports.getAllMembers = exports.deleteMember = exports.changeMember = exports.addMember = void 0;

var _georgianLan = _interopRequireDefault(require("../util/georgianLan"));

var _Member = _interopRequireDefault(require("../models/Member"));

var _file2 = _interopRequireDefault(require("../util/file"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _multer = _interopRequireDefault(require("multer"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addMember = async (req, res) => {
  try {
    const {
      name,
      instrument,
      orbitLength,
      color,
      biography
    } = req.body;
    const newMemberInfo = {
      name,
      instrument,
      orbitLength,
      color,
      biography
    };

    for (const key in newMemberInfo) {
      if (key !== 'orbitLength' && key !== 'color') {
        if (!(0, _georgianLan.default)(newMemberInfo[key], key)) return res.status(400).json({
          message: `'${key}' მხოლოდ ქართულ ასოებს უნდა შეიცავდეს!`
        });
      }
    }

    const existingMember = await _Member.default.findOne({
      name
    });
    if (existingMember) return res.status(409).json({
      message: `'${name}' უკვე არის ბენდის წევრი!`
    });
    await _Member.default.create(newMemberInfo);
    return res.status(201).json({
      message: 'ბენდს წევრი წარმატებით დაემატა!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.addMember = addMember;

const getAllMembers = async (req, res) => {
  try {
    let page = req.query.page ? +req.query.page : 1;
    const membersPerPage = 3;
    const totalMembers = await _Member.default.find().countDocuments();
    const members = req.query.page ? await _Member.default.find().select('-__v').skip((page - 1) * membersPerPage).limit(membersPerPage) : await _Member.default.find().select('-__v');
    if (members.length === 0) return res.status(200).json({
      members: [{
        biography: '',
        color: '',
        instrument: '',
        name: '',
        orbitLength: 0,
        _id: ''
      }],
      paginationInfo: {
        totalMembers: 0
      }
    });
    const paginationInfo = {
      totalMembers: totalMembers
    };
    return res.status(200).json({
      members,
      paginationInfo
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllMembers = getAllMembers;

const deleteMember = async (req, res) => {
  try {
    const id = {
      _id: new _mongoose.default.Types.ObjectId(req.body.id)
    };
    const member = await _Member.default.findOne(id);
    if (!member) return res.status(404).json({
      message: 'წევრი ვერ მოიძებნა'
    });
    if (member.image) (0, _file2.default)(`public/${member.image}`);
    await _Member.default.deleteOne(id);
    return res.status(200).json({
      message: 'ბენდის წევრი წაიშალა!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteMember = deleteMember;

const changeMember = async (req, res) => {
  try {
    const {
      id,
      name,
      instrument,
      color,
      biography,
      orbitLength
    } = req.body;
    const member = await _Member.default.findById(new _mongoose.default.Types.ObjectId(id)).select('-__v');
    if (!member) return res.status(404).json({
      message: 'წევრი ვერ მოიძებნა'
    });
    member.name = name;
    member.instrument = instrument;
    member.color = color;
    member.orbitLength = orbitLength;
    member.biography = biography;
    await member.save();
    return res.status(200).json({
      message: 'წევრის ინფორმაცია შეიცვალა!'
    });
  } catch (err) {
    return res.status(409).json({
      message: `'${req.body.name}' უკვე არის ბენდის წევრი!`
    });
  }
};

exports.changeMember = changeMember;

const getOneMember = async (req, res) => {
  try {
    const {
      id
    } = req.body;
    const currentMember = await _Member.default.findById(id).select('-__v');
    if (!currentMember) return res.status(404).json({
      message: 'ბენდის წევრი ვერ მოიძებნა!'
    });
    return res.status(200).json(currentMember);
  } catch (error) {
    return res.status(422).json({
      message: 'წევრის id არ არის ვალიდური'
    });
  }
};

exports.getOneMember = getOneMember;

const multerStorage = _multer.default.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/images/members');
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

    const currentMember = await _Member.default.findById(req.body.id);

    if (!currentMember) {
      req.body.fileValidationError = 'ბენდის წევრი ვერ მოიძებნა';
      return cb(null, false, req.fileValidationError);
    }

    if (file.mimetype.startsWith('image') && currentMember) {
      if (_fs.default.existsSync(`public/${currentMember === null || currentMember === void 0 ? void 0 : currentMember.image}`) && currentMember.image) {
        (0, _file2.default)(`public/${currentMember === null || currentMember === void 0 ? void 0 : currentMember.image}`);
      }

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
const uploadMemberPhoto = upload.single('photo');
exports.uploadMemberPhoto = uploadMemberPhoto;

const uploadImage = async (req, res) => {
  try {
    const currentMember = await _Member.default.findById(req.body.id);
    if (!currentMember) return res.status(404).json({
      message: 'ბენდის წევრი ვერ მოიძებნა!'
    });
    if (req.body.fileValidationError) return res.status(422).json({
      message: 'ატვირთეთ მხოლოდ სურათი!'
    });

    if (req.file) {
      currentMember.image = req.file.path.substring(7);
      await currentMember.save();
      return res.status(201).json({
        message: 'ბენდის წევრის ავატარი წარმატებით აიტვირთა!'
      });
    } else return res.status(422).json({
      message: 'ატვირთეთ ბენდის წევრის ავატარი'
    });
  } catch (error) {
    return res.status(422).json({
      message: 'წევრის id არ არის ვალიდური'
    });
  }
};

exports.uploadImage = uploadImage;
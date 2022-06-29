"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerStorage = exports.multerFilter = void 0;

var _deleteFile = _interopRequireDefault(require("../util/deleteFile"));

var _multer = _interopRequireDefault(require("multer"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multerStorage = location => {
  const storage = _multer.default.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, `public/images/${location}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${req.body.id}-${new Date().toISOString()}.${ext}`);
    }
  });

  return storage;
};

exports.multerStorage = multerStorage;

const multerFilter = (model, text) => {
  const filter = async (req, file, cb) => {
    try {
      if (req.body.id.length !== 24) {
        req.body.fileValidationError = 'id უნდა შეიცავდეს 24 სიმბოლოს';
        return cb(null, false, req.fileValidationError);
      }

      const currentDoc = await model.findById(req.body.id);

      if (!currentDoc) {
        req.body.fileValidationError = `${text} ვერ მოიძებნა`;
        return cb(null, false, req.fileValidationError);
      }

      if (file.mimetype.startsWith('image') && currentDoc) {
        if (_fs.default.existsSync(`public/${currentDoc === null || currentDoc === void 0 ? void 0 : currentDoc.image}`) && currentDoc.image) (0, _deleteFile.default)(`public/${currentDoc === null || currentDoc === void 0 ? void 0 : currentDoc.image}`);
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

  return filter;
};

exports.multerFilter = multerFilter;
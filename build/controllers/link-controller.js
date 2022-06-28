"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLink = void 0;

var _Link = _interopRequireDefault(require("../models/Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return res.status(201).send({
      message: 'სოციალური ბმული წარმატებით შეინახა!'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.addLink = addLink;
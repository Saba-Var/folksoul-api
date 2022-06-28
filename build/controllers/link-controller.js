"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllLinks = exports.addLink = void 0;

var _Link = _interopRequireDefault(require("../models/Link"));

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
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadMemberPhoto = exports.getOneMember = exports.changeMember = exports.deleteMember = exports.getAllMembers = exports.addMember = void 0;
const Member_1 = __importDefault(require("../models/Member"));
const mongoose_1 = __importDefault(require("mongoose"));
const file_1 = __importDefault(require("../util/file"));
const georgianLan_1 = __importDefault(require("../util/georgianLan"));
const multer_1 = __importDefault(require("multer"));
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, instrument, orbitLength, color, biography } = req.body;
        const newMemberInfo = {
            name,
            instrument,
            orbitLength,
            color,
            biography,
        };
        for (const key in newMemberInfo) {
            if (key !== 'orbitLength' && key !== 'color') {
                const param = newMemberInfo[key];
                if (!(0, georgianLan_1.default)(param, key))
                    return res.status(400).json({
                        message: `'${key}' მხოლოდ ქართულ ასოებს უნდა შეიცავდეს!`,
                    });
            }
        }
        const existingMember = yield Member_1.default.findOne({ name });
        if (existingMember)
            return res
                .status(409)
                .json({ message: `'${name}' უკვე არის ბენდის წევრი!` });
        yield Member_1.default.create(newMemberInfo);
        return res.status(201).json({ message: 'ბენდს წევრი წარმატებით დაემატა!' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.addMember = addMember;
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page;
        if (req.query.page)
            page = +req.query.page;
        else
            page = 1;
        const membersPerPage = 3;
        const totalMembers = yield Member_1.default.find().countDocuments();
        const members = req.query.page
            ? yield Member_1.default.find()
                .select('-__v')
                .skip((page - 1) * membersPerPage)
                .limit(membersPerPage)
            : yield Member_1.default.find().select('-__v');
        if (members.length === 0)
            return res.status(200).json({
                members: [
                    {
                        biography: '',
                        color: '',
                        instrument: '',
                        name: '',
                        orbitLength: 0,
                        _id: '',
                    },
                ],
                paginationInfo: {
                    totalMembers: 0,
                },
            });
        const paginationInfo = {
            totalMembers: totalMembers,
        };
        return res.status(200).json({ members, paginationInfo });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllMembers = getAllMembers;
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = { _id: new mongoose_1.default.Types.ObjectId(req.body.id) };
        const member = yield Member_1.default.findOne(id);
        if (!member)
            return res.status(404).json({ message: 'წევრი ვერ მოიძებნა' });
        if (member.image)
            (0, file_1.default)(`public/${member.image}`);
        yield Member_1.default.deleteOne(id);
        return res.status(200).json({ message: 'ბენდის წევრი წაიშალა!' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteMember = deleteMember;
const changeMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, instrument, color, biography, orbitLength } = req.body;
        const member = yield Member_1.default.findById(id).select('-__v');
        if (!member)
            res.status(404).json({
                message: 'წევრი ვერ მოიძებნა',
            });
        member.name = name;
        member.instrument = instrument;
        member.color = color;
        member.orbitLength = orbitLength;
        member.biography = biography;
        yield member.save();
        return res.status(200).json({ message: 'წევრის ინფორმაცია შეიცვალა!' });
    }
    catch (err) {
        return res
            .status(409)
            .json({ message: `'${req.body.name}' უკვე არის ბენდის წევრი!` });
    }
});
exports.changeMember = changeMember;
const getOneMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const currentMember = yield Member_1.default.findById(id).select('-__v');
        if (!currentMember)
            return res.status(404).json({ message: 'ბენდის წევრი ვერ მოიძებნა!' });
        return res.status(200).json(currentMember);
    }
    catch (error) {
        return res.status(422).json({ message: 'წევრის id არ არის ვალიდური' });
    }
});
exports.getOneMember = getOneMember;
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${req.body.id}-${new Date().toISOString()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const currentMember = yield Member_1.default.findById(req.body.id);
    if (currentMember === null || currentMember === void 0 ? void 0 : currentMember.image)
        (0, file_1.default)(`public/${currentMember === null || currentMember === void 0 ? void 0 : currentMember.image}`);
    if (file.mimetype.startsWith('image') && currentMember) {
        cb(null, true);
    }
    else if (!file.mimetype.startsWith('image')) {
        req.body.fileValidationError = 'ატვირთეთ მხოლოდ სურათი!';
        return cb(null, false, req.fileValidationError);
    }
});
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.uploadMemberPhoto = upload.single('photo');
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentMember = yield Member_1.default.findById(req.body.id);
        if (!currentMember)
            return res.status(404).json({ message: 'ბენდის წევრი ვერ მოიძებნა!' });
        if (req.body.fileValidationError)
            return res.status(422).json({ message: 'ატვირთეთ მხოლოდ სურათი!' });
        if (req.file) {
            currentMember.image = req.file.path.substring(7);
            yield currentMember.save();
            return res.status(201).json({
                message: 'ბენდის წევრის ავატარი წარმატებით აიტვირთა!',
            });
        }
        else
            return res.status(422).json({ message: 'ატვირთეთ ბენდის წევრის ავატარი' });
    }
    catch (error) {
        return res.status(422).json({ message: 'წევრის id არ არის ვალიდური' });
    }
});
exports.uploadImage = uploadImage;

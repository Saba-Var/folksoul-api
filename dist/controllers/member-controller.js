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
exports.deleteMember = exports.getAllMembers = exports.addMember = void 0;
const Member_1 = __importDefault(require("../models/Member"));
const mongoose_1 = __importDefault(require("mongoose"));
const checkIfGeorgian = (text) => {
    const geoRegex = /[\u10A0-\u10FF]/;
    const word = text.replace(/\s/g, '');
    for (let i = 0; i < word.length; i++) {
        if (!geoRegex.test(word[i]))
            return false;
    }
    return true;
};
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
                if (!checkIfGeorgian(param))
                    return res.status(400).json({
                        message: `'${key}' მხოლოდ წართულ ასოებ უნდა შეიცავდეს!`,
                    });
            }
        }
        const existingMember = yield Member_1.default.findOne({ name });
        if (existingMember)
            return res
                .status(400)
                .json({ message: `ბენდის წევრი უკვე არის '${name}'!` });
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
        const members = yield Member_1.default.find()
            .select('-__v')
            .skip((page - 1) * membersPerPage)
            .limit(membersPerPage);
        if (members.length === 0)
            return res.status(200).json([]);
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
        yield Member_1.default.deleteOne(id);
        return res.status(200).json({ message: 'ბენდის წევრი წაიშალა!' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteMember = deleteMember;

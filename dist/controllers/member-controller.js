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
exports.getAllMembers = exports.addMember = void 0;
const Member_1 = __importDefault(require("../models/Member"));
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
                        message: `Property '${key}' must include only Georgian characters!`,
                    });
            }
        }
        const existingMember = yield Member_1.default.findOne({ name });
        if (existingMember)
            return res
                .status(400)
                .json({ message: `Member '${name}' already exists!` });
        yield Member_1.default.create(newMemberInfo);
        return res
            .status(201)
            .json({ message: 'Success! Member saved successfully' });
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
            currentPage: page,
            hasNextPage: membersPerPage * page < totalMembers,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalMembers / membersPerPage),
        };
        return res.status(200).json({ members, paginationInfo });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllMembers = getAllMembers;

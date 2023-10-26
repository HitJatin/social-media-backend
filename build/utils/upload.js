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
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        if (!fs_1.default.existsSync(`${path_1.default.join(__dirname, '../')}public/dps`)) {
            fs_1.default.mkdirSync(`${path_1.default.join(__dirname, '../')}public/dps`, { recursive: true });
        }
        if (!fs_1.default.existsSync(`${path_1.default.join(__dirname, '../')}public/posts`)) {
            fs_1.default.mkdirSync(`${path_1.default.join(__dirname, '../')}public/posts`, { recursive: true });
        }
        if (req.params.type === "dp")
            cb(null, `${path_1.default.join(__dirname, '../')}public/dps`);
        else
            cb(null, `${path_1.default.join(__dirname, '../')}public/posts`);
    }),
    filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const { ext } = path_1.default.parse(file.originalname);
        const name = (`${Date.now() + "-" + Math.ceil(Math.random() * 1000)}${ext}`);
        cb(null, name);
    }),
});
exports.upload = (0, multer_1.default)({ storage: storage });

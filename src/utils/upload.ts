import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		if (!fs.existsSync(`${path.join(__dirname, '../')}public/dps`)){
			fs.mkdirSync(`${path.join(__dirname, '../')}public/dps`, { recursive: true });
		}
		if (!fs.existsSync(`${path.join(__dirname, '../')}public/posts`)){
			fs.mkdirSync(`${path.join(__dirname, '../')}public/posts`, { recursive: true });
		}
        if(req.params.type === "dp")
		cb(null, `${path.join(__dirname, '../')}public/dps`);
		else
		cb(null, `${path.join(__dirname, '../')}public/posts`);
	},
	filename: async (req, file, cb) => {
		const {ext} = path.parse(file.originalname);
		const name = (`${Date.now() + "-" + Math.ceil(Math.random()*1000)}${ext}`);
		cb(null, name);
	},
});

export const upload = multer({ storage: storage });
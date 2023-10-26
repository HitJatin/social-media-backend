import { RequestHandler } from "express";

export const uploadImage: RequestHandler = async (req, res) => {
    try {
        if(req.file?.filename)
        return res.status(200).json({
			success: true,
			message: "Image uploaded.",
			data: [{
                path: `${process.env.BACKEND_URL}api/public/${req.params.type}s/${req.file.filename}`,
            }]
		});
        return res.status(400).json({
			success: false,
			message: "Image couldn't be uploaded.",
			data: []
		});

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};
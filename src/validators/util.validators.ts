import { RequestHandler } from "express";
import Joi from "joi";

export const validateUpload: RequestHandler = async (req, res, next) => {
    try {
        const uploadSchema = Joi.object({
            type: Joi.string().valid('dp', 'post')
        })
        await uploadSchema.validateAsync(req.params);
        next()
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};
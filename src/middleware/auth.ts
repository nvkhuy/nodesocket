import jwt from "jsonwebtoken";
import config from "../utils/config";
import {NextFunction, Request, Response} from "express";

function validateToken(bearerToken: string | undefined): { valid: boolean; payload?: any } {
    if (!bearerToken) return {valid: false};

    // Extract token from "Bearer <token>"
    const token = bearerToken.split(' ')[1];

    try {
        const payload = jwt.verify(token, config.SECRET_KEY);
        return {valid: true, payload};
    } catch (err) {
        return {valid: false};
    }
}

function validateRequest(req: Request, res: Response, next: NextFunction) {
    const {valid, payload} = validateToken(req.headers['authorization']);
    if (!valid) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    req.user = payload;
    next();
}

declare module 'express' {
    interface Request {
        user?: any; // You can replace `any` with your custom user type if defined
    }
}


export default {
    validateToken, validateRequest
}
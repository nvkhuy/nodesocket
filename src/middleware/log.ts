import {Request, Response, NextFunction} from "express";

function requestAt(req: Request, res: Response, next: NextFunction) {
    console.log('Time:', Date.now())
    next()
}

export default {
    requestAt
}
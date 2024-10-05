import {Request, Response} from 'express';
import userRepo from "../repo/users";

function Get(req: Request, res: Response) {
    const {username} = req.params;
    const user = userRepo.getByUsername(username);
    if (!user) {
        return res.status(401).json({message: 'Invalid username'});
    }
    res.json({data: user});
}

export default {
    Get,
}
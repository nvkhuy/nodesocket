import {Request, Response} from 'express';
import jwt from "jsonwebtoken";
import config from "../utils/config";

const SECRET_KEY = config.SECRET_KEY;

const users = [
    {username: 'john', password: 'password123'},
    {username: 'jane', password: 'password456'}
];

function Login(req: Request, res: Response) {
    const {username, password} = req.body;

    // Mock user validation (replace with database validation in real applications)
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({message: 'Invalid username or password'});
    }

    // Generate a JWT token with the username embedded
    const token = jwt.sign({username}, SECRET_KEY, {expiresIn: '1h'});

    // Return the token in the response
    res.json({token: `Bearer ${token}`});
}

export default {
    Login,
}
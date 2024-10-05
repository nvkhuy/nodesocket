import jwt from "jsonwebtoken";
import config from "../utils/config";

function authenticate(header: string | undefined): { valid: boolean; payload?: any } {
    if (!header) return {valid: false};

    // Extract token from "Bearer <token>"
    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, config.SECRET_KEY);
        return {valid: true, payload};
    } catch (err) {
        console.error('Invalid token:', (err as Error).message);
        return {valid: false};
    }
}

export default {
    authenticate
}
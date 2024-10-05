import {Router} from 'express';
import auth from '../controller/auth';

const api = Router();

api.post('/api/v1/auth/login', auth.Login)

export {api as RouterV1}
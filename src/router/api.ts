import express, {Router} from 'express';
import authController from '../controller/auth';
import userController from '../controller/user';
import logMiddleware from '../middleware/log';
import authMiddleware from '../middleware/auth';
import cors from 'cors';

const api: Router = Router();
api.use(cors());
api.use(express.json());
api.use(logMiddleware.customMorgan);

const v1: Router = Router();
api.use('/v1', v1);

const auth: Router = Router();
v1.use('/auth', auth);
auth.post('/login', authController.Login);

const user: Router = Router();
v1.use('/users', authMiddleware.validateRequest, user)
user.get('/:username', userController.Get)

export {api as routerV1};
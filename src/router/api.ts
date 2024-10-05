import {Router} from 'express';
import authController from '../controller/auth';
import logMiddleware from '../middleware/log';
import bodyParser from "body-parser";

const api: Router = Router();
api.use(bodyParser.json());
api.use(logMiddleware.requestAt);

const auth: Router = Router();
const v1: Router = Router();

api.use('/v1', v1);
v1.use('/auth', auth);
auth.post('/login', authController.Login);


export {api as RouterV1};
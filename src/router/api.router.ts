import express, { Router } from 'express'
import authController from '../controller/auth.controller'
import userController from '../controller/user.controller'
import logMiddleware from '../middleware/log.middleware'
import authMiddleware from '../middleware/auth.middleware'
import cors from 'cors'

const apiRouter: Router = Router()
apiRouter.use(cors())
apiRouter.use(express.json())
apiRouter.use(logMiddleware.customMorgan)

const v1: Router = Router()
apiRouter.use('/v1', v1)

const auth: Router = Router()
v1.use('/auth', auth)
auth.post('/login', authController.Login)

const user: Router = Router()
v1.use('/users', authMiddleware.validateRequest, user)
user.get('/:username', userController.Get)

export { apiRouter as routerV1 }

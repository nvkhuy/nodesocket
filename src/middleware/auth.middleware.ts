import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../utils/config'
import { NextFunction, Request, Response } from 'express'

function validateToken(bearerToken: string | undefined): { valid: boolean; payload?: JwtPayload | string } {
  if (!bearerToken) return { valid: false }

  // Extract token from "Bearer <token>"
  const token = bearerToken.split(' ')[1]

  try {
    const payload = jwt.verify(token, config.SECRET_KEY)
    return { valid: true, payload }
  } catch (err) {
    console.log('error:', err)
    return { valid: false }
  }
}

function validateRequest(req: Request, res: Response, next: NextFunction) {
  const { valid, payload } = validateToken(req.headers['authorization'])
  if (!valid) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const { username } = payload
  req.user = username
  next()
}

export default {
  validateToken,
  validateRequest
}

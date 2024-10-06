import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import userRepo from '../repo/users.repo'

function Login(req: Request, res: Response) {
  const { username, password } = req.body
  const user = userRepo.find(username, password)
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }
  const token = jwt.sign({ username }, config.SECRET_KEY, { expiresIn: '1h' })
  res.json({ token: `Bearer ${token}` })
}

export default {
  Login
}

import { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import * as fs from 'fs'
import * as path from 'path'
import config from '../utils/config'

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../' + config.ACCESS_LOG), { flags: 'a' })

function customMorgan(req: Request, res: Response, next: NextFunction) {
  morgan.token('body', () => {
    return res.statusCode !== 200 ? JSON.stringify(req.body) : 'ok'
  })
  let responseBody = ''
  const originalSend = res.send
  res.send = function (body: string, ...args: IArguments[]) {
    responseBody = body
    return originalSend.apply(res, [body, ...args] as IArguments[])
  }
  morgan.token('resBody', () => {
    return res.statusCode !== 200 ? responseBody : 'ok'
  })
  const format = ':date[iso] :method :url :status - :response-time ms - :body - :resBody'
  morgan(format, { stream: accessLogStream })(req, res, next)
}

export default {
  customMorgan
}

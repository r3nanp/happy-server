import 'dotenv/config'
import 'reflect-metadata'
import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { AppError } from '@errors/AppError'
import { upload } from '@config/upload'
import '../typeorm/createConnection'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/files', express.static(upload.directory))

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ): Response => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error.stack)
    }

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
)

export { app }

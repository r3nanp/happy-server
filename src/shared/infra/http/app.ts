import 'dotenv/config'
import 'reflect-metadata'
import 'express-async-errors'

import express from 'express'
import '../typeorm/createConnection'

const app = express()

export { app }

import { Router } from 'express'
import { createSessionController } from '../controllers/CreateSessionController'

const sessionsRouter = Router()

sessionsRouter.post('/', createSessionController.create)

export { sessionsRouter }

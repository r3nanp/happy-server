import { Router } from 'express'
import { createUserController } from '@modules/users/infra/http/controllers/CreateUserController'

const usersRouter = Router()

usersRouter.post('/', createUserController.create)

export { usersRouter }

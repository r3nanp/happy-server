import { Router } from 'express'
import { sendForgotPassword } from '@modules/users/infra/http/controllers/SendForgotPassword'
import { resetPasswordController } from '@modules/users/infra/http/controllers/ResetPasswordController'

const passwordRouter = Router()

passwordRouter.post('/forgot', sendForgotPassword.create)
passwordRouter.post('/reset', resetPasswordController.create)

export { passwordRouter }

import { Router } from 'express'
import { orphanageRoutes } from '@modules/orphanages/infra/http/routes/orphanages.routes'
import { usersRouter } from '@modules/users/infra/http/routes/users.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes'

const routes = Router()

routes.use('/orphanages', orphanageRoutes)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)

export { routes }

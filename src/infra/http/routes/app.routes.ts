import { Router } from 'express'
import { orphanageRoutes } from '@modules/orphanages/infra/http/routes/orphanages.routes'

const routes = Router()

routes.use('/orphanages', orphanageRoutes)

export { routes }

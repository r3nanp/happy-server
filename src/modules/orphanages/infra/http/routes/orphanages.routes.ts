import { Router } from 'express'
import multer from 'multer'
import { upload } from '@config/upload'

import { createOrphanageController } from '../controllers/CreateOrphanage'
import { searchOrphanageController } from '../controllers/SearchOrphanage'
import { showOrphanageController } from '../controllers/ShowOrphanage'

const orphanageRoutes = Router()
const uploadConfig = multer(upload)

orphanageRoutes.get('/', searchOrphanageController.index)

orphanageRoutes.get('/:id', showOrphanageController.show)

orphanageRoutes.post(
  '/',
  uploadConfig.array('images'),
  createOrphanageController.create
)

export { orphanageRoutes }

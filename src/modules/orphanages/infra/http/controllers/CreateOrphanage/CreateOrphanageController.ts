import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as yup from 'yup'
import { Orphanage } from '@modules/orphanages/infra/typeorm/entities/orphanage.entity'

export class CreateOrphanageController {
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body

    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = req.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
      latitude: yup.number().required('Latitude is required'),
      longitude: yup.number().required('Longitude is required'),
      about: yup.string().max(300).required('About is required'),
      instructions: yup.string().required('Instructions are required'),
      opening_hours: yup.string().required('Opening hours are required'),
      open_on_weekends: yup.boolean().required('Open on weekends field is required'),
      images: yup.array(
        yup.object().shape({
          path: yup.string().required('Image path is required'),
        })
      ).required('One image or some are required'),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)

    return res.status(201).json(orphanage)
  }
}

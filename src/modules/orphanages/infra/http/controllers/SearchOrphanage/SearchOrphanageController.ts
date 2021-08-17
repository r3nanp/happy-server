import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Orphanage } from '@modules/orphanages/infra/typeorm/entities/orphanage.entity'
import { orphanageView } from '@modules/orphanages/views/Orphanage'

export class SearchOrphanageController {
  async index(_request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return response.status(200).json(orphanageView.renderMany(orphanages))
  }
}

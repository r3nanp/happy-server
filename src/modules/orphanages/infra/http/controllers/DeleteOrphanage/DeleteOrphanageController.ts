import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Orphanage } from '@modules/orphanages/infra/typeorm/entities/orphanage.entity'

export class DeleteOrphanageController {
  async delete(request: Request, response: Response) {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    await orphanagesRepository.delete(id)

    return response.status(204).json([])
  }
}

import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Orphanage } from "@modules/orphanages/infra/typeorm/entities/orphanage.entity"
import { orphanageView } from "@modules/orphanages/views/Orphanage"

export class ShowOrphanageController {
  async show(request: Request, response: Response) {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    })

    return response.status(200).json(orphanageView.render(orphanage))
  }
}

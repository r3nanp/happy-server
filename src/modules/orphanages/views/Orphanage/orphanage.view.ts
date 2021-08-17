import { IOrphanage } from '@modules/orphanages/domain/models/IOrphanage'
import { imageView } from '../Image'

export class OrphanageView {
  render(orphanage: IOrphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imageView.renderMany(orphanage.images)
    }
  }

  renderMany(orphanages: IOrphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}

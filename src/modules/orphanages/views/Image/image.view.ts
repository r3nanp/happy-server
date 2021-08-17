import type { IImage } from '@modules/orphanages/domain/models/IImage'

export class ImageView {
  render(image: IImage) {
    return {
      id: image.id,
      url: `${process.env.APP_URL}/uploads/${image.path}`
    }
  }

  renderMany(images: IImage[]) {
    return images.map(image => this.render(image))
  }
}

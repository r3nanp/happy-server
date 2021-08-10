import { IImage } from './IImage'

export interface IOrphanage {
  readonly id: string
  name: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  created_at: Date
  updated_at: Date
  images: IImage[]
}

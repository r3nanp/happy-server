import { IOrphanage } from './IOrphanage'

export interface IImage {
  readonly id: string
  path: string
  orphanage: IOrphanage
}

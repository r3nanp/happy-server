import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Orphanage } from './orphanage.entity'
import { IImage } from 'modules/orphanages/domain/models/IImage'

@Entity('images')
export class Image implements IImage {
  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }

  @PrimaryColumn()
  readonly id: string

  @Column()
  path: string

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)

  @JoinColumn({
    name: 'orphanage_id'
  })
  orphanage: Orphanage
}

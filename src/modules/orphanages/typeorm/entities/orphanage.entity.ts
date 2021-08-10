import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { IOrphanage } from 'modules/orphanages/domain/models/IOrphanage'
import { Image } from './image.entity'

@Entity('orphanages')
export class Orphanage implements IOrphanage {
  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }

  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column('decimal')
  latitude: number

  @Column('decimal')
  longitude: number

  @Column()
  about: string

  @Column()
  instructions: string

  @Column()
  opening_hours: string

  @Column()
  open_on_weekends: boolean

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })

  @JoinColumn({
    name: 'orphanage_id'
  })

  images: Image[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

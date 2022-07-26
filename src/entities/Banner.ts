import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('banner')
export class Banner {
  @PrimaryColumn('varchar', { length: 36 })
  id: string

  @Column()
  url: string

  @Column()
  disponivel: boolean

  constructor(url: string, disponivel: boolean, id?: string) {
    this.url = url
    this.disponivel = disponivel
    if (!id) {
      this.id = uuid()
    } else {
      this.id = id
    }
  }
}

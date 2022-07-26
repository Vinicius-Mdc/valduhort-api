import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('produto')
export class Produto {
  @PrimaryColumn('varchar', { length: 36 })
  id: string

  @Column()
  nome: string

  @Column()
  disponivel: number

  @Column()
  foto: string

  @Column()
  preco: number

  constructor(
    nome: string,
    disponivel: number,
    foto: string,
    preco: number,
    id?: string
  ) {
    this.nome = nome
    this.disponivel = disponivel
    this.foto = foto
    this.preco = preco
    if (!id) {
      this.id = uuid()
    } else {
      this.id = id
    }
  }
}

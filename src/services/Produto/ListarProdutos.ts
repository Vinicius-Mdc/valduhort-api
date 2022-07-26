import db from '../../database/dataSource'
import { Produto } from '../../entities/Produto'

export default async (
  busca: string = '',
  total: number = 5
): Promise<Array<Produto> | Error> => {
  const repo = db.getRepository(Produto)
  return await repo
    .createQueryBuilder('produto')
    .where(`produto.nome LIKE '%${busca}%'`)
    .limit(total)
    .orderBy('nome')
    .getMany()
}

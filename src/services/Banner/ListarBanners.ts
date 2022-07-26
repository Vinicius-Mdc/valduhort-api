import db from '../../database/dataSource'
import { Banner } from '../../entities/Banner'

export default async (): Promise<Array<Banner> | Error> => {
  const repo = db.getRepository(Banner)
  return await repo.findBy({
    disponivel: true,
  })
}

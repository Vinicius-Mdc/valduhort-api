import { NextFunction, Request, Response } from 'express'
import listarBanners from '../../services/Banner/ListarBanners'

export const listarBannersAtivos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resposta = await listarBanners()
    res.json(resposta)
  } catch (e) {
    next(e)
  }
}

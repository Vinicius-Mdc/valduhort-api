import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../../middlewares/ApiError'
import listarProdutos from '../../services/Produto/ListarProdutos'

export const listarTodosProdutos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      next(ApiError.badRequest(errors.array()[0].msg))
      return
    }
    const { busca, total = 5 } = req.query
    const resposta = await listarProdutos(
      busca as string,
      parseInt(total as string)
    )
    res.json(resposta)
  } catch (e) {
    console.log(e)
    next(e)
  }
}

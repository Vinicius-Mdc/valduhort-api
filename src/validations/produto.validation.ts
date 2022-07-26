import { query } from 'express-validator'

export const LISTAR_PRODUTOS = 'listarProdutos'

export const validacao = (method: string) => {
  switch (method) {
    case LISTAR_PRODUTOS:
      return [
        query('busca', 'Busca inválida').optional(),
        query('total', 'Total inválido').optional().isNumeric(),
      ]
    default:
      return []
  }
}

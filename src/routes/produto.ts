import express from 'express'
import { listarTodosProdutos } from '../controllers/Produto/ListarTodosProdutos'
import { LISTAR_PRODUTOS, validacao } from '../validations/produto.validation'

const router = express.Router()

router.get('/', validacao(LISTAR_PRODUTOS), listarTodosProdutos)

export default router

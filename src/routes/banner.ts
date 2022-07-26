import express from 'express'
import { listarBannersAtivos } from '../controllers/Banner/ListarBannersAtivos'

const router = express.Router()

router.get('/', listarBannersAtivos)

export default router

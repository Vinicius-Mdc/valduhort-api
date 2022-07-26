import 'reflect-metadata'
import './database/dataSource'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import userRouter from './routes/usuario'
import bannerRouter from './routes/banner'
import produtosRouter from './routes/produto'

const app = express()

app.use(require('cors')())
app.disable('x-powered-by')
app.use(express.json())

app.use('/usuario', userRouter)
app.use('/banners', bannerRouter)
app.use('/produtos', produtosRouter)

// eslint-disable-next-line no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.sql) {
    res.status(500).json({ mensagem: 'Algo deu errado.' })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ mensagem: 'Token inválido ou expirado' })
  } else {
    res.status(err.code).json({ message: err.message })
  }
})
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${process.env.PORT || 3000}`)
})

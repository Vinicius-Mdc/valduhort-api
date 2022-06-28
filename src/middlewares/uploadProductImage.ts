import { adminStorage, BUCKET } from '../database/firebase'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from './apiError'
import { validationResult } from 'express-validator'

export const uploadProductImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(ApiError.badRequest(errors.array()[0].msg))
    return
  }
  if (!req.file) {
    next()
    return
  }
  const fileName = Date.now() + '.' + req.file?.originalname.split('.').pop()
  const file = adminStorage
    .bucket()
    .file(`products/${req.body.barCode}/${fileName}`)
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file?.mimetype,
    },
  })
  stream.on('error', () => {
    next(new ApiError(500, 'Erro ao enviar arquivo.'))
  })
  stream.on('finish', async () => {
    await file.makePublic()
    const url = `https://storage.googleapis.com/${BUCKET}/products/${req.body.barCode}/${fileName}`
    res.locals.url = url
    next()
  })
  stream.end(req.file?.buffer)
}

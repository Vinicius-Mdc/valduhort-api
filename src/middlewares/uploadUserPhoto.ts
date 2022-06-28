import { adminStorage, BUCKET } from '../database/firebase'
import { NextFunction, Request, Response } from 'express'
import { ApiError } from './apiError'
import { validationResult } from 'express-validator'

export const uploadUserPhoto = (
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
  const file = adminStorage.bucket().file(`users/${res.locals.uid}/${fileName}`)
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
    const url = `https://storage.googleapis.com/${BUCKET}/users/${res.locals.uid}/${fileName}`
    res.locals.url = url
    next()
  })
  stream.end(req.file?.buffer)
}

export const uploadUserPhotoWithBase64 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(ApiError.badRequest(errors.array()[0].msg))
    return
  }

  const { image, imageType } = req.body
  const imageBuffer = Buffer.from(image, 'base64')

  const fileName = Date.now() + '.' + imageType.split('/').pop()
  const file = adminStorage.bucket().file(`users/${res.locals.uid}/${fileName}`)
  const stream = file.createWriteStream({
    metadata: {
      contentType: imageType,
    },
  })
  stream.on('error', () => {
    next(new ApiError(500, 'Erro ao enviar arquivo.'))
  })
  stream.on('finish', async () => {
    await file.makePublic()
    const url = `https://storage.googleapis.com/${BUCKET}/users/${res.locals.uid}/${fileName}`
    console.log(url)
    res.locals.url = url
    next()
  })
  stream.end(imageBuffer)
}

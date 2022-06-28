import { Usuario } from '../../entities/Usuario'
import db from '../../database/dataSource'
import { genSaltSync, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { ApiError } from '../../middlewares/ApiError'

type RespostaRegistroUsuario = {
  id: string
  nome: string
  email: string
  token: string
}

export default async (
  nome: string,
  email: string,
  senha: string
): Promise<RespostaRegistroUsuario | Error> => {
  const repo = db.getRepository(Usuario)
  if (
    await repo.findOneBy({
      email,
    })
  ) {
    throw new ApiError(400, 'Email já cadastrado')
  }
  const usuario = new Usuario(nome, email, await hash(senha, genSaltSync(10)))
  await repo.insert(usuario)
  const token = sign({ nome, id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '720h',
  })
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    token,
  }
}

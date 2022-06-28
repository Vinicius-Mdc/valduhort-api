import { Usuario } from '../../entities/Usuario'
import db from '../../database/dataSource'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { ApiError } from '../../middlewares/ApiError'

type RespostaAutenticacaoUsuario = {
  id: string
  nome: string
  email: string
  token: string
}

export default async (
  email: string,
  senha: string
): Promise<RespostaAutenticacaoUsuario | Error> => {
  const repo = db.getRepository(Usuario)
  const usuario = await repo.findOneBy({
    email,
  })
  if (usuario) {
    if (!(await compare(senha, usuario.senha))) {
      throw new ApiError(400, 'Senha incorreta')
    }
    const token = sign(
      { nome: usuario.nome, id: usuario.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '720h',
      }
    )
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token,
    }
  } else {
    throw new ApiError(400, 'Email não cadastrado')
  }
}

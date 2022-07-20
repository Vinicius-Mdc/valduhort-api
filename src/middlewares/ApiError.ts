export class ApiError extends Error {
  codigo: number
  mensagem: string
  constructor(code: number, mensagem: string) {
    super()
    this.codigo = code
    this.mensagem = mensagem
  }

  static badRequest(msg: string) {
    return new ApiError(400, msg)
  }

  static forbidden(msg: string) {
    return new ApiError(403, msg)
  }

  static internal(msg: string) {
    return new ApiError(500, msg)
  }
}

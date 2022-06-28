export class ApiError extends Error {
  code: number
  message: string
  constructor(code: number, message: string) {
    super()
    this.code = code
    this.message = message
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

namespace NodeJS {
  interface ProcessEnv {
    TYPEORM_CONNECTION: string
    TYPEORM_HOST: string
    TYPEORM_USERNAME: string
    TYPEORM_PASSWORD: string
    TYPEORM_DATABASE: string
    TYPEORM_PORT: string
    TYPEORM_MIGRATIONS: string
    TYPEORM_MIGRATIONS_DIR: string
    JWT_SECRET: string
  }
}

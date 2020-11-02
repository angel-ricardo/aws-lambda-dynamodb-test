export type LambdaReponse = {
  success?: {
    message: string
  }
  error?: {
    message: string
    reason: string
  }
}

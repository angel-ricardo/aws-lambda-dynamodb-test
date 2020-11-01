export type LambdaReponse = {
  success?: {
    message: string
    id: string
  }
  error?: {
    message: string
    reason: string
  }
}

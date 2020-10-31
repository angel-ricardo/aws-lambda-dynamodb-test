export type LambdaReponse = {
  success?: {
    user: {
      id: string
      name: string
    }
  }
  error?: string
}

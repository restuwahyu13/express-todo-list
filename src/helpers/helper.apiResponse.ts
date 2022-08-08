export interface APIResponse {
  status: string
  message: string
  data?: any
}

export const apiResponse = (status: string, message: string, data?: any): APIResponse => {
  return {
    status: status,
    message: message,
    data: data || {}
  }
}

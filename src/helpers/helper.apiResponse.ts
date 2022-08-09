import { STATUS_CODES } from 'http'

export interface APIResponse {
  statusCode: number
  status: string
  message: string
  data?: any
}

export const apiResponse = (statusCode: number, message: string, data?: any): APIResponse => {
  return {
    statusCode: statusCode,
    status: [200, 201].includes(statusCode) ? 'Success' : STATUS_CODES[statusCode],
    message: message,
    data: data || {}
  }
}

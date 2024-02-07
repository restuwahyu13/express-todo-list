import { StatusCodes as status } from 'http-status-codes'

export interface ApiResponse {
	stat_code?: number
	stat_message?: string
	err_message?: any
	data?: any
	pagination?: Record<string, any>
}

export const apiResponse = (configs: ApiResponse): ApiResponse => {
	for (let i of Object.keys(configs)) {
		if (configs[i] == undefined) {
			delete configs[i]
		}
	}

	if (configs.err_message && typeof configs.err_message !== 'string') {
		if (configs.err_message.hasOwnProperty('err_message')) {
			configs = configs.err_message
		}
		console.trace(configs.err_message)
	}

	if (!configs.stat_message && !configs.err_message) {
		configs.err_message = 'Internal server error'
	}

	return { stat_code: configs.stat_code ?? status.INTERNAL_SERVER_ERROR, ...configs }
}

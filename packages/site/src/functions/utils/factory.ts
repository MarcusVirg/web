import type { HandlerEvent, HandlerContext } from '@netlify/functions'
import { z } from 'zod'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
}

function functionFactory<F extends Function>(runFunc: F, errorMessage: string) {
	return async (e: HandlerEvent, ctx: HandlerContext) => {
		if (e.httpMethod === 'OPTIONS') {
			return {
				statusCode: 200,
				headers
			}
		}

		try {
			const data = await runFunc(e, ctx)
			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(data)
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error(error.issues)
				return {
					statusCode: 400,
					headers,
					body: JSON.stringify(error.issues)
				}
			}

			console.error(error)
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({
					error: errorMessage
				})
			}
		}
	}
}

export default functionFactory

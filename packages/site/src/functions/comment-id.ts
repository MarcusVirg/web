import type {
	HandlerEvent,
	HandlerContext,
	HandlerResponse
} from '@netlify/functions'
import fetch from 'node-fetch'
// import { Redis } from '@upstash/redis'

async function run(
	_e: HandlerEvent,
	_ctx: HandlerContext
): Promise<HandlerResponse> {
	try {
		console.log(
			'making test call to redis with fetch and with token:',
			process.env.REDIS_TOKEN
		)

		const res = await fetch(
			`${process.env.REDIS_ENDPOINT as string}/get/commentId/bar`,
			{
				headers: {
					Authorization: `Bearer ${process.env.REDIS_TOKEN}`
				}
			}
		)

		if (!res.ok) {
			throw res
		}

		const data = await res.json()

		// const redis = new Redis({
		// 	url: process.env.REDIS_ENDPOINT as string,
		// 	token: process.env.REDIS_TOKEN as string
		// })
		// const commentId = await redis.get<number>('commentId')

		console.log('commentId:', data)

		return {
			statusCode: 200,
			body: JSON.stringify({ data })
		}
	} catch (err) {
		console.error(err)
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Something went wrong' })
		}
	}
}

export const handler = run

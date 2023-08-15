import type {
	HandlerEvent,
	HandlerContext,
	HandlerResponse
} from '@netlify/functions'
import { Redis } from '@upstash/redis'

async function run(
	_e: HandlerEvent,
	_ctx: HandlerContext
): Promise<HandlerResponse> {
	console.log('making test call to redis with token:', process.env.REDIS_TOKEN)

	const redis = new Redis({
		url: process.env.REDIS_ENDPOINT as string,
		token: process.env.REDIS_TOKEN as string
	})
	const commentId = await redis.get<number>('commentId')

	console.log('commentId:', commentId)

	return {
		statusCode: 200,
		body: JSON.stringify({ commentId })
	}
}

export const handler = run

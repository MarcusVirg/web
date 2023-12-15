import { z } from 'zod'
import type { HandlerEvent, HandlerContext } from '@netlify/functions'
import { Ratelimit } from '@upstash/ratelimit'
import redis from './store'
import AppError from './error'

const rateLimitCache = new Map<string, number>()
const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
}

type Unit = 'ms' | 's' | 'm' | 'h' | 'd'
type Duration = `${number} ${Unit}` | `${number}${Unit}`
type FactoryOptions = {
	featureFlag?: string
	rateLimit?: { requests: number; duration: Duration }
}

function functionFactory<F extends Function>(runFunc: F, opts: FactoryOptions = {}) {
	return async (e: HandlerEvent, _ctx: HandlerContext) => {
		if (e.httpMethod === 'OPTIONS') {
			return {
				statusCode: 200,
				headers
			}
		}

		try {
			// Check feature flag
			if (opts.featureFlag) {
				const featureFlag = await redis.hget<boolean>('flags', opts.featureFlag)
				if (!featureFlag) {
					return {
						statusCode: 403,
						headers,
						body: 'This feature is not available right now.'
					}
				}
			}

			// Rate limit
			if (opts.rateLimit) {
				const rateLimiter = new Ratelimit({
					redis,
					ephemeralCache: rateLimitCache,
					limiter: Ratelimit.fixedWindow(
						opts.rateLimit.requests,
						opts.rateLimit.duration
					),
					analytics: true
				})
				const { success } = await rateLimiter.limit(
					e.headers['client-ip'] || '0.0.0.0'
				)
				if (!success)
					return {
						statusCode: 429,
						headers,
						body: 'Too many requests, please try again later.'
					}
			}

			const data = await runFunc(e, redis)

			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(data)
			}
		} catch (error) {
			console.error(error)

			if (error instanceof z.ZodError) {
				return {
					statusCode: 400,
					headers,
					body: JSON.stringify(error.issues)
				}
			}

			if (error instanceof AppError) {
				return {
					statusCode: error.statusCode,
					headers,
					body: error.message
				}
			}

			return {
				statusCode: 500,
				headers,
				body: 'Something went wrong, please try again later.'
			}
		}
	}
}

export default functionFactory

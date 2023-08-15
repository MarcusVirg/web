import { Redis } from '@upstash/redis'
import config from './config'

console.log(config)

const store = {
	connect: () =>
		new Redis({
			url: config.REDIS_ENDPOINT,
			token: config.REDIS_TOKEN
		})
}

export type Store = Redis

export default store

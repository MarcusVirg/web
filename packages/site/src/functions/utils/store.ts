import { Redis } from '@upstash/redis'

// const REDIS_ENDPOINT = process.env.REDIS_ENDPOINT as string
// const REDIS_TOKEN = process.env.REDIS_TOKEN as string
const REDIS_ENDPOINT = 'https://gusc1-quiet-parakeet-30121.upstash.io'
const REDIS_TOKEN =
	'AXWpASQgZWZhOWFlZTUtZTg5NS00ZmU5LThkYTAtY2U4YzAxNTZmY2I3ZDY0YzI1ZDBhOTAwNGI3ODgwM2I2M2I3OWIyZmYyN2M='

const store = {
	connect: () =>
		new Redis({
			url: REDIS_ENDPOINT,
			token: REDIS_TOKEN
		})
}

export default store

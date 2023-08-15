import 'dotenv/config'
import { z } from 'zod'

const ConfigSchema = z.object({
	REDIS_ENDPOINT: z.string(),
	REDIS_TOKEN: z.string()
})

console.log(process.env.REDIS_ENDPOINT)

export default ConfigSchema.parse(process.env)

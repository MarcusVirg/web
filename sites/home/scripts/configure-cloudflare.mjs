import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const LOCAL_DATABASE_ID = '00000000-0000-0000-0000-000000000000'
const UUID_PATTERN = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i
const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const siteDirectory = resolve(scriptDirectory, '..')
const repositoryDirectory = resolve(siteDirectory, '../..')
const templatePath = resolve(siteDirectory, 'wrangler.template.jsonc')
const outputPath = resolve(siteDirectory, 'wrangler.generated.jsonc')
const local = process.argv.includes('--local')

function getDatabaseId() {
	if (local) return LOCAL_DATABASE_ID

	if (process.env.CLOUDFLARE_D1_DATABASE_ID) {
		return process.env.CLOUDFLARE_D1_DATABASE_ID.trim()
	}

	try {
		return execFileSync(
			'terraform',
			['-chdir=infra/home', 'output', '-raw', 'd1_database_id'],
			{
				cwd: repositoryDirectory,
				encoding: 'utf8',
				stdio: ['ignore', 'pipe', 'pipe']
			}
		).trim()
	} catch {
		throw new Error(
			'Unable to read d1_database_id from infra/home. Apply the home Terraform root first, or set CLOUDFLARE_D1_DATABASE_ID.'
		)
	}
}

const databaseId = getDatabaseId()
if (!UUID_PATTERN.test(databaseId)) {
	throw new Error(`Invalid D1 database ID: ${databaseId}`)
}

const template = readFileSync(templatePath, 'utf8')
if (!template.includes('__D1_DATABASE_ID__')) {
	throw new Error('wrangler.template.jsonc does not contain the D1 placeholder')
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, template.replace('__D1_DATABASE_ID__', databaseId))
console.log(`Generated ${outputPath}`)

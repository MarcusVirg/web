import { z } from 'zod'
import { AddComment, DeleteComment, GetComments } from './comments/commands'
import type { CommentAggregate } from './comments/types'

const JSON_HEADERS = {
	'Cache-Control': 'no-store',
	'Content-Type': 'application/json; charset=utf-8'
}

class HttpError extends Error {
	constructor(
		readonly status: number,
		message: string
	) {
		super(message)
	}
}

function json(data: unknown, status = 200, extraHeaders?: HeadersInit) {
	return Response.json(data, {
		status,
		headers: { ...JSON_HEADERS, ...extraHeaders }
	})
}

function errorResponse(error: unknown) {
	if (error instanceof z.ZodError) return json(error.issues, 400)
	if (error instanceof SyntaxError) return json({ error: 'Invalid JSON body' }, 400)
	if (error instanceof HttpError) return json({ error: error.message }, error.status)

	console.error(error)
	return json({ error: 'Something went wrong, please try again later.' }, 500)
}

async function getComments(request: Request, env: Env) {
	const url = new URL(request.url)
	const command = GetComments.parse({ blogId: url.searchParams.get('blogId') })
	const query = await env.DB.prepare(
		`SELECT
			blog_id AS blogId,
			id AS commentId,
			author,
			comment,
			created_at AS timestamp
		FROM comments
		WHERE blog_id = ? AND deleted_at IS NULL
		ORDER BY created_at DESC, id DESC`
	)
		.bind(command.blogId)
		.all<CommentAggregate>()

	return json(query.results)
}

async function enforceRateLimit(request: Request, env: Env) {
	const identifier = request.headers.get('CF-Connecting-IP') ?? 'unknown'
	const windowStart = Math.floor(Date.now() / 60_000) * 60
	const result = await env.DB.prepare(
		`INSERT INTO rate_limits (identifier, window_start, request_count)
		VALUES (?, ?, 1)
		ON CONFLICT (identifier, window_start)
		DO UPDATE SET request_count = request_count + 1
		RETURNING request_count`
	)
		.bind(identifier, windowStart)
		.first<{ request_count: number }>()

	if (!result || result.request_count > 2) {
		throw new HttpError(429, 'Too many requests, please try again later.')
	}
}

async function addComment(request: Request, env: Env, context: ExecutionContext) {
	const flag = await env.DB.prepare(
		'SELECT enabled FROM feature_flags WHERE key = ?'
	)
		.bind('add-comment')
		.first<{ enabled: number }>()

	if (flag?.enabled !== 1) {
		throw new HttpError(403, 'This feature is not available right now.')
	}

	await enforceRateLimit(request, env)
	const command = AddComment.parse(await request.json())
	const createdAt = new Date().toISOString()
	const comment = await env.DB.prepare(
		`INSERT INTO comments (blog_id, author, comment, created_at)
		VALUES (?, ?, ?, ?)
		RETURNING
			blog_id AS blogId,
			id AS commentId,
			author,
			comment,
			created_at AS timestamp`
	)
		.bind(command.blogId, command.author, command.comment, createdAt)
		.first<CommentAggregate>()

	if (!comment) throw new Error('D1 did not return the created comment')

	const currentWindow = Math.floor(Date.now() / 60_000) * 60
	context.waitUntil(
		env.DB.prepare('DELETE FROM rate_limits WHERE window_start < ?')
			.bind(currentWindow - 3600)
			.run()
	)

	return json(comment, 201)
}

async function deleteComment(request: Request, env: Env, commentId: string) {
	const authorization = request.headers.get('Authorization')
	if (
		!env.COMMENT_ADMIN_TOKEN ||
		authorization !== `Bearer ${env.COMMENT_ADMIN_TOKEN}`
	) {
		throw new HttpError(401, 'Unauthorized')
	}

	const url = new URL(request.url)
	const command = DeleteComment.parse({
		blogId: url.searchParams.get('blogId'),
		commentId
	})
	const deletedAt = new Date().toISOString()
	const result = await env.DB.prepare(
		`UPDATE comments
		SET deleted_at = ?
		WHERE id = ? AND blog_id = ? AND deleted_at IS NULL
		RETURNING id`
	)
		.bind(deletedAt, command.commentId, command.blogId)
		.first<{ id: number }>()

	if (!result) throw new HttpError(404, 'Comment not found')
	return json({ blogId: command.blogId, commentId: result.id, deletedAt })
}

async function handleApi(request: Request, env: Env, context: ExecutionContext) {
	const url = new URL(request.url)

	if (url.pathname === '/api/comments') {
		if (request.method === 'GET') return getComments(request, env)
		if (request.method === 'POST') return addComment(request, env, context)
		if (request.method === 'OPTIONS') return new Response(null, { status: 204 })
		return json({ error: 'Method not allowed' }, 405, {
			Allow: 'GET, POST, OPTIONS'
		})
	}

	const deleteMatch = url.pathname.match(/^\/api\/comments\/(\d+)$/)
	if (deleteMatch) {
		if (request.method === 'DELETE') {
			return deleteComment(request, env, deleteMatch[1])
		}
		return json({ error: 'Method not allowed' }, 405, { Allow: 'DELETE' })
	}

	return json({ error: 'Not found' }, 404)
}

export default {
	async fetch(request, env, context) {
		try {
			const url = new URL(request.url)
			if (url.hostname === 'www.marcusv.me') {
				url.hostname = 'marcusv.me'
				return Response.redirect(url, 308)
			}

			if (url.pathname.startsWith('/api/')) {
				return await handleApi(request, env, context)
			}

			return env.ASSETS.fetch(request)
		} catch (error) {
			return errorResponse(error)
		}
	}
} satisfies ExportedHandler<Env>

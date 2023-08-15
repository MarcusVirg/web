class AppError extends Error {
	statusCode: number

	constructor(statusCode: number, message: string) {
		super(message)
		this.name = this.constructor.name
		this.statusCode = statusCode
	}
}

export default AppError

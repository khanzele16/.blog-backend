import jwt from 'jsonwebtoken'

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
	if (token) {
		const decoded = jwt.verify(token, '.blog24')
		req.userId = decoded._id
		next()
	} else {
		next()
	}
}

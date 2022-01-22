const JwtService = require('../services/jwt')

module.exports = {
  async isUserAuthenticated(req, res, next) {
    const { authorization } = req.headers
    if (authorization) {
      const [, accessToken] = authorization.split(' ')
      try {
        const { id } = JwtService.verify(accessToken)
        req.user = id
        next()
      } catch (err) {
        return res.json({
          error: 'Unauthenticated'
        })
      }
    } else {
      return res.json({
        error: 'Token not found'
      })
    }
  }
}

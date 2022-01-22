const refreshTokenModel = require('../models/refresh-token')
const JwtService = require('./jwt')

exports.isUserAuthenticated = async cookie => {
  // get cookie string
  if (cookie) {
    // string to object then destructure
    const { accessToken, refreshToken } = JSON.parse(cookie)
    try {
      // verify accesstoken
      JwtService.verify(accessToken)
      return true
    } catch (err) {
      // if error found to verify accessToken

      // check refresh token in database
      const isRefreshTokenAvailble = await refreshTokenModel.findOne({ refreshToken })
      if (isRefreshTokenAvailble) {
        return true
      } else {
        return false
      }
    }
  } else {
    return false
  }
}

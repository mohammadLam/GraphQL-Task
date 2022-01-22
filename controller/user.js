const { compare, hash } = require('bcrypt')
const UserModel = require('../models/user')

const JwtService = require('../services/jwt')

const authorController = {
  async signup(req, res) {
    const { name, password } = req.body
    const hashedPassword = await hash(password, 10)
    const User = new UserModel({
      name,
      password: hashedPassword
    })

    try {
      await User.save()
      return res.json(req.body)
    } catch (err) {
      return res.json(err)
    }
  },

  async signin(req, res) {
    const { name, password } = req.body
    const user = await UserModel.findOne({ name })
    if (user) {
      const isPasswordMatched = await compare(password, user.password)
      if (isPasswordMatched) {
        const accessToken = JwtService.sign({ id: user._id }, '1min', process.env.JWT_SECRET)
        const refreshToken = JwtService.sign({ id: user._id }, '1y', process.env.JWT_REFRESH_SECRET)

        return res.json({ accessToken, refreshToken })
      } else {
        return res.json({
          error: 'Password not matched'
        })
      }
    } else {
      return res.json({
        error: 'User not found'
      })
    }
  }
}

module.exports = authorController

const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { compare } = require('bcrypt')
const { sign } = require('../../services/jwt')

// Type
const UserType = require('../type/user')
const BlogType = require('../type/blog')
const ErrorAndTokenType = require('../type/token')

// Model
const UserModel = require('../../models/user')
const BlogModel = require('../../models/blog')
const refreshTokenModel = require('../../models/refresh-token')

exports.getAllUsers = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await UserModel.find()
  }
}

exports.getAllBlogs = {
  type: new GraphQLList(BlogType),
  async resolve() {
    return await BlogModel.find()
  }
}

exports.getBlogByUserId = {
  type: BlogType,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(parent, args) {
    const { id } = args
    return await BlogModel.find({ user: id })
  }
}

exports.getBlogById = {
  type: BlogType,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(parent, args) {
    const { id } = args
    return await BlogModel.findOne({ _id: id })
  }
}

exports.signIn = {
  type: ErrorAndTokenType,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parent, args, context) {
    const { name, password } = args
    const user = await UserModel.findOne({ name })
    if (user) {
      // check password wrong or right
      try {
        const isPasswordTrue = await compare(password, user.password)

        if (isPasswordTrue) {
          const accessToken = sign(
            {
              id: user._id,
              name: user.name
            },
            '60s'
          )

          const refreshToken = sign(
            {
              id: user._id,
              name: user.name
            },
            '1y',
            process.env.JWT_REFRESH_SECRET
          )

          await refreshTokenModel.create({ refreshToken })

          try {
            context.res.cookie('tokens', JSON.stringify({ accessToken, refreshToken }), {
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
            })
          } catch (err) {
            console.log(err)
          }

          return {
            error: '',
            tokens: { accessToken, refreshToken }
          }
        } else {
          return {
            error: 'Password not matched!',
            tokens: { accessToken: null, refreshToken: null }
          }
        }
      } catch (err) {
        return {
          error: err.messege,
          tokens: { accessToken: null, refreshToken: null }
        }
      }
    } else {
      return {
        error: 'User not found',
        tokens: { accessToken: null, refreshToken: null }
      }
    }
  }
}

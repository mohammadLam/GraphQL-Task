const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')
const UserModel = require('../../models/user')
const BlogModel = require('../../models/blog')

// Type
const BlogType = require('./blog')
const UserType = require('./user')

module.exports = new GraphQLObjectType({
  name: 'Comment',
  fields: () => {
    return {
      id: { type: GraphQLID },
      user: {
        type: UserType,
        async resolve(parent) {
          const { user } = parent
          return await UserModel.findOne({ _id: user })
        }
      },
      blog: {
        type: GraphQLID
        // async resolve(parent) {
        //   const { blog } = parent
        //   return await BlogModel.findOne({ _id: blog })
        // }
      },
      body: { type: GraphQLString }
    }
  }
})

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql')
const UserType = require('../type/user')
const CommentType = require('./comment')
const UserModel = require('../../models/user')
const CommentModel = require('../../models/comment')

module.exports = new GraphQLObjectType({
  name: 'Blog',
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
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      tags: { type: new GraphQLList(GraphQLString) },
      comments: {
        type: new GraphQLList(CommentType),
        async resolve(parent) {
          return await CommentModel.find({ blog: parent._id })
        }
      }
    }
  }
})

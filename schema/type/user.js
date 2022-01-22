const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      password: { type: GraphQLString }
    }
  }
})

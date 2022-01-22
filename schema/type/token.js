const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')

const TokensType = new GraphQLObjectType({
  name: 'Tokens',
  fields: {
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString }
  }
})

module.exports = new GraphQLObjectType({
  name: 'ErrorAndToken',
  fields: {
    error: { type: GraphQLString },
    tokens: { type: TokensType }
  }
})

const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// create the GraphQL Yoga Server. 

// This function takes a schema.graphql, and matches everything in the schema with the resolvers ( mutation or query )
function createServer() {
 return new GraphQLServer({
   typeDefs: 'src/schema.graphql',
   resolvers: {
     Mutation,
     Query
   },
   resolverValidationOptions: {
     requireResolversForResolveType: false
   },
  //  this exposes the database to every single request
   context: req => ({ ...req, db })
 });
}

module.exports = createServer; 
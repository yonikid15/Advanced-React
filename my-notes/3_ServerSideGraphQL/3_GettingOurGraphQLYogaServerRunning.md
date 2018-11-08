# Server Side GraphQL

## Getting our GraphQL Yoga Server Running

- Now that we have the GrapQL Database setup with Prisma, it's time to work on the GraphQL Yoga side of things.

- We give Prisma our data model, and it's going to create a set of CRUDS APIs, and if we go to the generated prisma.graphql, you'll know that if we look at **type mutation** we have all of our mutations, same with qeuries and our subscriptions. 

- However, we cannot use that directly via JS because there is no sort of security layer, authentication layer, and most importantly there's no layer that we can add on **custom logic**.

- Therefore, in order to add things like:
  - custom server side logic
  - charge credit cards
  - sending email
  - hash passwords
  - permissions

  We need to add GraphQL Yoga. There's a whole section of logic that needs to happen before data is pulled or pushed to the PrismaDB, which can be achieved with Yoga.

- In hindsight, ReactJS is going to use Apollo Client to query our GraphQL Yoga endpoint. Then on the server GraphQL Yoga is going to connect to the PrismaDB, and pull and push the data.

## Steps

1. To connect Yoga to Prisma were going to need a file that will connect directly to Prisma using something called **prisma-binding**. prisma-binding is a module which contains JS bindings for the Prisma database, and its going to allow us to do things like:
  - Connect to the database
  - Query data from the DB
  - Mutate data in the DB 
  
  So first create a **db.js** file in the **src** directory.

  backend/src/db.js
      
    // This file connects to the remote prisma db and gives us the ability to query it with JS.
    const { Prisma } = require('prisma-binding');

    // This creates our new database
    const db = new Prisma({
      // typeDefs takes the path to prisma.graphql 
      // (that is why we needed the post-deploy hook in the graphqlconfig)
      typeDefs: 'src/generated/prisma.graphql',
      // endpoint to the database
      endpoint: process.env.PRISMA_ENDPOINT,
      // secret key needed to access database
      secret: process.env.PRISMA_SECRET,
      // debug information
      debug: false
    });

    module.exports = db;

2. Next, we need to create the **Yoga Server**. Were going to call it **createServer.js**. This is where were going to import the GraphQL Yoga server. NOTE: GraphQL Yoga is an express server. It is built on top of Express and Apollo Server, see [GraphQL Yoga](https://github.com/prisma/graphql-yoga) for docs. 

This file also contains are Resolvers. Resolvers answers the quesion where does this data come from?, or What does this data do in the DB? There are 2 different kinds of resolvers:

  - Query resolvers
    - which is when you pull data.
  - Mutation resolvers
    - which is when you push data.

  So create the file createServer.js and add it to the **src** directory.

  createServer.js

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


3. Were going to need another file called **schema.graphql**, because were essentially creating 2 GraphQL Servers. We have our Prisma Server which requires its own type definitions and schema, and then we have our GraphQL server (Yoga) which has its own type definitions and schema as well.

5. Finally, we will add a **index.js** file to kickstart our server. 

  index.js

      require('dotenv').config({ path: 'variables.env' });
      const createServer = require('createServer');
      const db = require('./db');

      const server = createServer();

      // TODO Use express middleware to handle cookies (JWT)
      // TODO Use express middleware to populate current user

      server.start({
        cors: {
          credentials: true,
          origin: process.env.FRONTEND_URL
        },
      }, data => {
        console.log(`Server is now running on port http:/localhost:${data.port}`);
      });

6. run 

    npm run dev 

  and make sure to add a schema for Mutation and Query within the **schema.graphql** file or else your createServer function will send errors.
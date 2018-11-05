# Introduction and Setup

## Sick Fits and Tech Stack 

### Frontend Stack:

#### React.JS: For Building the Interface

- React.js

- Next.js
  - Next.js allows server rendering of our React application. It also provides other features such as configuring pages and creating the overall layout of the app.
  - It comes with its own custom routing.
  - It provides its own Webpack, so it handles all the bundling and tooling.

- Styled Components
  - Were going to be using styled-components to write CSS specifically for each component.

- React Apollo
  - React Apollo acts as an adapter for the Apollo client.


#

#### Apollo Client: For Data Management

- Apollo Client
  - When using GraphQL, Apollo replaces the need to use React State or Redux. 
  - It helps perform mutations with GraphQL, such as selling something, adding an item, deleting an item, etc, so any time we are changing data.
  - It also allows fetching data from GraphQL backend queries.
  - It caches the GraphQL data, which is amazing because it speeds up your user interaction since the data is stored in the cache. There is no secondary cache we need to manage (like Redux).
  - Manages Local State, so it handles data locally such as storing, retrieving, deleting, etc. A good example of Local State use is a cart on a e-commerce site.
  - Manages Error and Loading state, so catching any errors that could arise during user interaction.

#

### Backend Stack:

#### GraphQL Yoga: An Express GraphQL Server

- GrapgQL Yoga
  - This server is going to proxy all the requests, and can be used to manipulate the data before being stored in the database. This logic layer will be used to create custom server side logic, add authentication, create permissions. 
  - Also, things like charging credit cards needs to be done on the server side before being sent to the database. 


#

#### A GraphQL Database Interface

- Prisma
  - Prisma takes a empty or existing database, and provides a sort of interface layer on top of the database, for the common CRUD operations. This is handy because when you are using a GraphQL API it provides a very comprehensive API right on top of all the data models.
  - So, using Prisma were going to define what are data looks like, and it is going to ingest that and provide us with a set of API's that allows us to do all the CRUD operations on top of it.
  - We will define our schema
  - We can use GraphQL to establish any relationships between are data.
  - It can also be self hosted or used as a service.
# Server Side GraphQL

## An Intro to GraphQL

- What is GraphQL? GraphQL is a **specification** built to implement both: 
  - a server in GraphQL to **serve** up data 
  - as well as be able to **fetch** data from the client

- GraphQL is agnostic to the language, meaning that your server can implement GraphQL in any language that it wants. And, the frontend, or the thing that consumes your GraphQL data can interface with a GraphQL interface. 

- GraphQL is a SPEC. So, previously what we had for fetching data were JSON APIs. Everytime you use an API, you need to learn how that API works like: what tokens do I need to specifically pass this API for it to work?, do I need to have it as a GET or a POST request?... This can get a little confusing since you must relearn how APIs work across every single one. Also, when fetching data from the APIs it can come with alot of uneccesary extra data. 

So GraphQL is either out to replace REST, or you can also setup a GraphQL server, that sits in front of a REST API that will sort of proxy the data in between it.

- What we need to understand thought is that, GraphQL is a specification that's being put out, and you can implement this in any language. We are going to be implementing it on our frontend with a library called **Apollo**. Also, we will be implementing it on the backend with a library called **Prisma**, and another library called **GraphQL Yoga**.

### How It Works

- GraphQL is a single end point that you hit, which is very different from a REST API where you would have many different URLs that you would hit. Also, with a REST API if you wanted to get data from multiple endpoints, then you'd have to make multiple requests to the server.

- With GrapQL all you have is **ONE** endpoint, and you send it your **query**, and then it will return the exact data you've requested. When querying data, it's very easy because you structure the query request similar to JSON format, and what gets returned is the JSON in the same struture as the query, but with the actual values.

  eg.

    query {
      items {
        id
        title
      }
    }


    RETURNS:

    "data": {
      "items": {
        ...
        {
          "id": ...
          "title": ...
        },
        ...
      }
    }

- GraphQL is a typed language. Therefore, when you define your data, you have to specifically define what **typeof** each value is going to be. The benefit of having a typed language is your able to analyze your code, and provide a benuch of documentation. This documentation is extremely useful when creating your **queries and mutations**, since I can find out exactly what type of data im grabbing.

- Also, GraphQL queries makes for writing relationships very, very simple...

- GraphQL can also **mutate** data, again with a single endpoint. These are refered to as **mutations** which includes editing, pushing, and deleting data from the database.

- GraphQL, the QL stands for query language, but by default GraphQL actually has no filtering, no sorting, etc. It doesn't come with any of the tools you have from MySQL or something like that. Therefore, in order to use any logic within GraphQL we must add a library ontop. GraphQL is simply a way to vocalize what you want, and then that gets passed to your server, and then the server implements these things called **resolvers**. Resolvers essentially answer the question: how and where do I ge this data from? Then from there you use your MySQL or MongoDB, etc. to handle things like filtering, sorting, and searching of data.

- Therefore GraphQL does not replace your database, but is just a standard to request specific data.
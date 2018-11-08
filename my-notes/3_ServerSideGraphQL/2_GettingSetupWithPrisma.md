# Server Side GraphQL

## Getting Setup with Prisma

- Were going to start building our GraphQL server, that we can interface with out React application. 

### Prisma

- Prisma is a 100% open source library, that sort of sits on top of an existing or new database, and provides you a full-featured GraphQL API. We can use this API to:
  - perform all of our CRUD operations, 
  - create relationships between data,
  - updating data 
  - etc.

- Then we will layer on **Yoga** on top of that, which will alow us to add our custom logic, **specific** to our application, that does not come with **Prisma**. 

### Steps 

1. Create a Prisma Server Demo Account, and login to your account. Go to console page. 

2. In a terminal, within the project folder, we need to globally install **Prisma**.

  - npm i -g prisma

3. Next, we need to log into our Prisma account. Enter the following command into your terminal, and grant permission in the window that pops up.

  - prisma login

4. Next we need to initialize our prisma server.

  - prisma init

5. Make sure to hit Demo Server in the prisma init, then pick the demo server with the least latency. Then enter the information like name of service, and name of stages. IMPORTANT: make sure to hit **Dont Generate**, when choosing programming language for client.

6. After init is done, prisma should have created 2 files:
  - datamodel.graphql or datamodel.prisma
  - prisma.yml

  Within **prima.yml** we will modify some information:

    1. We will stick the **endpoint** value within an ENV variable. (This allows us to set values depending on the environment)

      - endpoint: ${env:PRISMA_ENDPOINT}
    
    2. Next, we will add a **secret** field. BUT then comment it out, this will be used for production.

      - # secret: ${env:PRISMA_SECRET}
    
    3. Last, we need something called a **post-deploy hook**. We need this because, when we modify our data model (within the **datamodel.prisma** file) like adding fields, we then need to relay that new updated information to out Prisma, which is hosted on the Prisma Server. In order to do that, we need to deploy the new data model, and then Prisma will return to us a **graphql schema**. (Everytime you change the datamodel you need to deploy, so you receive the new updated schema). 

      - hooks: 
          post-deploy:
            - graphql get-schema -p prisma
    
  Within **datamodel.prisma** comes a default data model, which we will later make our own to fit the sick fits data structure.

7. Now we want to **deploy** our data model to the Prisma Server, that is running on prisma.io.

  - prisma deploy

8. Congrats! You have deployed the service to your project. KEEP NOTE: We are currently using the demo server. This is fine for development purposes, but not production.

9. You should now have a new file within a src/generated folder called **prisma.graphql**. This is the auto-generated schema created by Prisma using the data model provided within **datamodel.prisma**.

This is why Prisma is awesome, it creates all of the API, which lives in prisma.graphql file. If you look in the folder it has all our **Mutations**, **Querys**, **Subscriptions**, etc. This saves us from hours of creating our own endpoints.

Thats pretty much it. You can also go to the link provided to you in the terminal when you deploy to the prisma service, and this will take you to a playground. This is very useful for testing.
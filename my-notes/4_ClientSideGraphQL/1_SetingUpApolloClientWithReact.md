# Client Side GraphQL

## Setting Up Apollo Client with React

- Apollo Client is used for Data Management. Apollo does everything the Redux store manager will do, plus more, including:

  - Performing GraphQL Mutations
  - Fetching GraphQL Queries
  - Caching GraphQL Data
  - Managing Local State
  - Error and Loading UI States
  - etc.

Apollo has sort of become the gold standard for working with GrapQL in React. 

## withData.js Breakdown

- Open up **withData.js**

  Imports:

  - First thing we did was import the **Apollo Client** from the package called **apollo-boost**. This package put out by Apollo comes with all the standard things that you would want to use with an Apollo installation including:
    
    - apollo-client
    - apollo-cache-inmemory : our recommended cache
    - apollo-link-http : link for remote data fetching
    - apollo-link-error : link for error handling
    - apollo-link-state : link for local state management
    - graphql-tag : exports the **gql** function for your queries and mutations


  - Second, we need this package called **next-with-apollo**. This is going to give us a **high-order component** that will expose our Apollo Client ( Apollo Client is like the *database* in the client ) via a **prop**.

  NOTE: **ReactApollo** comes with some tools for doing this. however because we are doing this with **Next.js**, and we need **server-side rendering** to work, theres a little bit of extra work that we need to do for that to work. This is why we need **next-with-apollo**.

  - Finally, we added our endpoint value, which is going to contain the Yoga API endpoint. (In dev its just localhost:4444)


 CODE:

      function createClient({ headers }) {
        return new ApolloClient({
          uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
          request: operation => {
            operation.setContext({
              fetchOptions: {
                credentials: 'include',
              },
              headers,
            });
          },
        });
      }

      export default withApollo(createClient);
  

- First, we create a function **createClient**, that takes some headers (this will be important for authentication).

- The function returns a **new Apollo Client**. It takes the url endpoint we imported earlier. 

- Then we have the **request** key. So, on every single request that happens, this acts like an *express middleware*. The function allows us to include our **credentials**, so that when we make a request, if any cookies are logged in the browser, then they will be retrieved.

- Finally, we export the function **withApollo**, which takes the **createClient** within its parameters. 

### Creating a Client Within Our App.js

- First, import 2 things:

      import { ApolloProvider} from 'react-apollo';
      import withData from '../lib/withData';

- Wrap each page component within the **ApolloProvider** component, this will provide us with the data. And set the **client** prop equal to **this.props.apollo**. How is this data available? Well next we will export the App component, but wrap it in the higher-order component **withData(MyApp)**. This makes the ApolloClient accecible via **this.props**.

        class MyApp extends App {
          render() {
            // Component is a page component (eg. sell.js)
            const { Component, apollo, pageProps } = this.props;

            return (
              <Container>
                <ApolloProvider client={apollo}>
                  <Page>
                    <Component {...pageProps} />
                  </Page>
                </ApolloProvider>
              </Container>
            )
          }
        }

        export default withData(MyApp);

- Finally, were going to need to do some extra work in order to **expose page numbers**. When we go to different pages in our app, we are going to need to **surface those page values**. Here is the code:

      static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if(Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
        // this exposes the query to the user
        pageProps.query = ctx.query;
        return { pageProps };
      }
  
This function **getInitialProps** is a lifecycle method, and will run first, before the first **render**, and by returning **pageProps** we expose it via **this.props**. This is really important, because what this does is for every single page we have, this function is going to **crawl** the entire page for any queries or mutations, and fetch them. Then it is spread into the component as props.

      render() {
        // Component is a page component (eg. sell.js)
        const { Component, apollo, pageProps } = this.props;

        return (
          <Container>
            <ApolloProvider client={apollo}>
              <Page>
                <Component {...pageProps} />
              </Page>
            </ApolloProvider>
          </Container>
        );
      }
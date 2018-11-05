# Introduction and Setup

## Next.js, Tooling and Routing

- Next.js is a lightweight framework for building websites and web applications.

- Next.js does all of your Webpack compiling, code splitting, etc. all under the hood.

- Most importantly, it handles server-side rendering for you. So if you care about instant loading, SEO or pre-loading certain pages, then server-side rendering is definitely something that you need.

- It also provides a feature called **getInitialProps**, which is going to allow you to fetch data on the server. The problem is solves is when you make asynchronous calls to the server, but you are not sure when the fetching is done so that you can send a response back from the server to the client and resolve the page. So, the **getInitialProps** life cycle method from **React**, allows us to wait on that data to resolve, before the page is actually shipped out to the browser. 

- Finally, it does routing for you by routing the endpoint with the correspoding page name (like PHP). It provides linking as well, check the docs for the rest pf features.
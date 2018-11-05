# Introduction and Setup

## Custom _app.js Layout

- We are going to utilize the **app.js** higher-order component provided by **next.js**, so that we can easily share data between pages.

- As shown in the next.js docs, the **Custom App component** is good for persisting layout between page changes, and keeping state when navigating pages ( see docs for more ).

- An example for why we need this is when we open the cart component, and then decide to switch pages I expect the cart slider to stay open on a new page, and still contain the items added on the previous page. This is persisting layout in action, as well as keeping state during navigation.

- see docs for more info
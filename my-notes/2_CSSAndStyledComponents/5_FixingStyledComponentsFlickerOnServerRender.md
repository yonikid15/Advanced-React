# CSS and Styled Components

## Fixing Styled Components Flicker on Server Render

- By default, as you refresh a page, you get a flash of unstyled html. What's happening is that the server is rendering the first run of the react application, and then the client side react is actually picking it up from there and updating it with the styles. 

- This is a problem because with server-side rendering everything needs to be fetched before sending the data to the browser, however currently the styled components is only being coupled on next to the component, and only shows up when it is mounted on the client-side.

- This problem is solved with Next.js using the method called **getInitialProps**, and the **Custom &lt;Document&gt;**.

  - getInitialProps

  - Custom &lt;Document&gt;
    - Its rendered on the server side
    - It is used to change the initial server side rendered document markup
    - Its commonly used to implement server side rendering and for **css-in-js** libraries like styled-components!

    
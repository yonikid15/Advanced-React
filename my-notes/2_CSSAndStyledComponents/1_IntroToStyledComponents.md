# CSS and Styled Components

## An Intro to Styled Components

- There's a couple ways to do CSS in React Applications:

  - The most basic being, do it the way you've always done it, which is writing your css in a **.css** file and adding a link tag to the head of the html page. And adding the css selectors to the components.

  - Or you can run SASS, and compile that to CSS, then add it after.

- These are all fine, but there is a new popular way of adding CSS, which got the name CSS in JS. What this means is you are writing the styles for your application, inside of your JS application. Also, the styles are usually coupled with the corresponding components.

What is the benefit of all that? This removes the concept of global styling (well at least the bad parts), meaning if you write specific styles for a Button component, the styling wont leak out and effect another component.

- Therefore, we will be using **Styled Components**. Things you might need:

  - vscode-styled-components extension (VS Code)
  - [styled-components](https://www.styled-components.com/)
## Ibra [![Build Status](https://travis-ci.org/dannav/ibra.svg?branch=master)](https://travis-ci.org/dannav/ibra)

Mix markdown syntax and lodash templating for rendering HTML.

### Install
```
  npm i ibra --save
```

Ibra is a performant templating engine for javascript that uses markdown syntax to define structure. Lodash style templates can be used to process logic in your markdown files.

For information on using lodash templates visit [the lodash documentation](//lodash.com/docs/4.17.4#template)

### Usage

Use `@{` and `@}` for defining blocks that should be evaluated as lodash templates.

```js
const text = `# @{
                <%=name %>
              @}

              Lorem ipsum dolor sit amet, consectetur ...

              @{
                <ul>
                <% for (var i = 1; i <= 10; i++) { %>
                  <li><%=i%></li>
                <% } %>
                </ul>
              @}`

const data = {name: 'tom'}
const ibra = require('ibra')
const html = ibra(text, data)

/* 
  html becomes: 
  
  <h1>tom</h1>
  <p>Lorem ipsum dolor sit amet, consectetur ... </p>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    ...
  </ul>'
*/
```

### Contributing
Fork this repository and run `npm install` in project directory.

#### Tests
`npm run test`

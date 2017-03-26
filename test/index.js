const {expect} = require('chai')

const expectedOutput = (
`<h1>Hidey Ho</h1>
<h2>Header Two</h2>
<p>Hello World</p>
<p>CLOSED</p>
`)

const content = `
# Hidey Ho 
<h2>Header Two</h2>

@{
  <%return 'Hello World'%>
@}

CLOSED`

const ibra = require('../lib/ibra')
describe('ibra', () => {
  it('parses lodash templates in markdown', () => {
    expect(ibra(content)).to.equal(expectedOutput)
  })

  it('should throw an error if there is not matching tags', () => {
    const text = `@{ return 'Hello World'`    
    const shouldFail = () => {
      ibra(text)
    }
    expect(shouldFail).to.throw
  })

  it('should  accept an object and render appropriate data', () => {
    const text = `# @{
                    <%=name %>
                  @}

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet, arcu quis posuere aliquam, mi ante consectetur enim, ac iaculis sed.

                  @{
                    <ul>
                    <% for (var i = 1; i <= 10; i++) { %>
                      <li><%=i%></li>
                    <% } %>
                    </ul>
                  @}`
    
    const data = {name: 'tom'}
    const expected = `
<h1>tom</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet, arcu quis posuere aliquam, mi ante consectetur enim, ac iaculis sed.</p>
<ul>
<li>1</li>
<li>2</li>
<li>3</li>
<li>4</li>
<li>5</li>
<li>6</li>
<li>7</li>
<li>8</li>
<li>9</li>
<li>10</li>
</ul>`

    expect(ibra(text, data)).to.equal(expected.trim())
  })
})
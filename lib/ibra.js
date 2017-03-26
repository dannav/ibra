const tmpl = require('lodash.template')
const md = require('markdown-it')({html: true})

const replaceTextAt = text => {
  return (start, end, replacement) => {
    return text.substr(0, start) + replacement + text.substr(end + 2)
  }
}

module.exports = (content, data) => {
  let i = 0
  
  // remove whitespace at beginning of each line
  content = content.replace(/^ +/gm, '');

  while (i < content.length) {
    const openTagIndex = content.indexOf('@{', i)
    if (openTagIndex === -1 || openTagIndex < i) break    

    const closeTagIndex = content.indexOf( '@}', openTagIndex)
    if (closeTagIndex === -1) {
      throw Error(`Open tag found on index: ${openTagIndex} with no closing tag.`)
    }

    const templateText = content.substr(openTagIndex + 2, (closeTagIndex-openTagIndex) - 2)
    const compiled = tmpl(templateText)
    const newText = compiled(data)

    const replace = replaceTextAt(content)
    content = replace(openTagIndex, closeTagIndex, newText.trim())

    i = openTagIndex
  }

  return md.render(content)
}
// rss/rss.js

const Parser = require('rss-parser')

const parse = url => {
  return new Promise((resolve, reject) => {
    new Parser().parseURL(url, (err, feed) => {
      if (err) {
        console.error(err.message)
        reject(new Error(`Failed to fetch podcast information. Feed: ${url}`))
        return
      }
      resolve(feed)
    })
  })
}

module.exports.parse = parse

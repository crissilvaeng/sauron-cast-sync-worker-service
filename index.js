// index.js

require('dotenv').config({
  path: './config/.env'
})

const Parser = require('rss-parser')
const { mongoose } = require('./db/mongoose')
const { Podcast } = require('./models/podcast')

const parser = new Parser()

parser.parseURL('https://hipsters.tech/feed/podcast/', (err, feed) => {
  if (err) {
    console.error('Failed to fetch podcast information. Error: ', err.message)
    return
  }

  const conditions = {link: feed.link}
  const options = {upsert: true, new: true }
  Podcast.findOneAndUpdate(conditions, feed, options, (err, data) => {
    if (err) {
      console.error('Failed to save record to database. Error: ', err.message)
      return
    }
    console.info('Podcast upserted. ID: ', data._id)
  })
  return
})

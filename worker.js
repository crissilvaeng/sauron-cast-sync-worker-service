// index.js

require('dotenv').config({
  path: './config/.env'
})

const amqp = require('./amqp/amqp')
const rss = require('./rss/rss')
const db = require('./db/db')

console.info('Starting worker...')

const callback = message => {
  rss.parse(message.feed)
    .then(podcast => db.upsert(podcast))
    .then(record => console.info(`Podcast upsert. ID: ${record}. Feed: ${message.feed}`))
    .catch(err => console.error(err.message))
}

amqp.consume(callback)

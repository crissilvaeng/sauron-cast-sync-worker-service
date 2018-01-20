// db/db.js

const { mongoose } = require('./mongoose')
const { Podcast } = require('./../models/podcast')

const upsert = podcast => {
  const conditions = { link: podcast.link }
  const options = { upsert: true, new: true }

  return new Promise((resolve, reject) => {
    Podcast.findOneAndUpdate(conditions, podcast, options, (err, data) => {
      if (err) {
        console.error(err.message)
        reject(new Error('Failed to save record to database.'))
        return
      }
      resolve(data._id)
    })
  })
}

module.exports.upsert = upsert

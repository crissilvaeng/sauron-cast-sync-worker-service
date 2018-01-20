// schemas/podcast.js

const mongoose = require('mongoose')

const podcastSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      link: String,
      enclosure: {
        url: String,
        length: String
      },
      content: String,
      guid: String,
      isoDate: Date,
      itunes: {
        author: String,
        subtitle: String,
        explicit: String,
        duration: String,
        image: String,
      }
    }
  ],
  title: String,
  description: String,
  link: String,
  itunes: {
    image: String,
    author: String,
    subtitle: String,
    summary: String,
    explicit: String,
  }
})

podcastSchema.index({link: 1}, {unique: true})
podcastSchema.index({"items.link": 1}, {unique: true})

const Podcast = mongoose.model('Podcast', podcastSchema)

module.exports = { Podcast }

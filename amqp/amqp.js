// amqp/amqp.js

const amqp = require('amqplib/callback_api')

const connect = (queue) => {
  return new Promise((resolve, reject) => {
    amqp.connect(queue, (err, conn) => {
      if (err) {
        console.error(err.message)
        reject(new Error('Unable to connect to the messaging service.'))
        return
      }
      conn.createChannel((err, ch) => {
        if (err) {
          console.error(err.message)
          reject(new Error('Unable to create channel in messaging service.'))
          return
        }
        resolve(ch)
      })
    })
  })
}

const consume = (callback) => {
  connect(process.env.RABBITMQ_URI)
    .then(ch => ch.consume(
        process.env.RABBITMQ_QUEUE,
        msg => callback(JSON.parse(msg.content)),
        { noAck: true }
      ))
    .catch(err => console.error(err.message))
}

module.exports.consume = consume

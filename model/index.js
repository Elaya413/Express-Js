const mongoose = require('mongoose')

const db = mongoose.connect(`${process.env.dbUrl}/${process.env.dbName}`)

module.exports = mongoose
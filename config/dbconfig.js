const mongodb = require ('mongodb')
const MongoClient = mongodb.MongoClient
const dbName = 'B46WET'
const dbUrl =`mongodb+srv://Elayavathi:elaya2001@cluster0.bf3duqg.mongodb.net/${dbName}`

const client = new MongoClient(dbUrl)


module.exports ={
    mongodb,
    client,
    dbName
}
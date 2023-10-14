const mongoose = require('./index')

const querySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    }
},{versionKey:false,collection:"query"})

const queryModel = mongoose.model('query',querySchema)

module.exports = queryModel;
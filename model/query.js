const mongoose = require('./index')
const Schema = require('mongoose')




const querySchema =  new mongoose.Schema({
    queryId: {
        
        type: Schema.Types.ObjectId,
    
         ref: 'userModel',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date().getTime()
    },
    replies: [{
        username: {
            type: String,
            required: true,
        },
        queryId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        reply: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date().getTime()
        }
    }]
}, {
    

    timestamps: true
})

const userQuery = mongoose.model('query', querySchema);

module.exports =  userQuery;

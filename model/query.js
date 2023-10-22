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
   
        reply: {
            type: String,
            default:"UNASSIGNED",
        }, 
      
   
   
}, {
    

    timestamps: true
})

const userQuery = mongoose.model('query', querySchema);

module.exports =  userQuery;

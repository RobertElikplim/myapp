// Create model that interact with the database //
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create an event schema that has event date, address,city,state,zipcode collection. //
let querySchema = new Schema({
    _id:{
        type: Number},
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    phoneNumber:{
        type:String
    }, 
    eventType:{
        type:String
    },
    zipCode:{
        type: Number
    },       
    COUNT: 
    {   type: Number
    }
},
{
collection: 'query'
});

module.exports = mongoose.model('query', querySchema)
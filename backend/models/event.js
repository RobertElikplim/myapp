// Create model that interact with the database //
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/BreadOfLife");
autoIncrement.initialize(connection);
ObjectId = Schema.ObjectId;


// Create an event schema that has event date, address,city,state,zipcode collection. //
let eventSchema = new Schema({
    _id:{type: Schema.Types.ObjectId
    },
    eventType:{
        type: String,
        required: true
    },
    eventDate:{
        type:String,
        required: true
    },
    eventCenter:{
        type: String,
        required: true
    },
    location:{
       type: String,
        required: true
    },
    dateStored:{
       type: String,
       required: true
    }
},
{
collection: 'events'
});

eventSchema.plugin(autoIncrement.plugin, 'event');    
module.exports = mongoose.model('event', eventSchema)
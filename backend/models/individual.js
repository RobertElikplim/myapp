// Import Moongoose and create model that interact with the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Create an Schema constructor using mongoose
autoIncrement = require('mongoose-auto-increment');// use the mongoose auto increment to set the ID counter
var connection = mongoose.createConnection("mongodb://localhost/BreadOfLife");// https://stackoverflow.com/questions/28357965/mongoose-auto-increment
autoIncrement.initialize(connection);
ObjectId = Schema.ObjectId;

//set the eventSchema equal the Schema constructor then define the schema property
let invidSchema = new Schema({
    _id:{type: Schema.Types.ObjectId, ref: 'individual'},
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String, 
        required: true
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: Number,
        required: true
    },
    mediaChannel:{
        type: [String],
        required: true
    },
    vaccine: {
        type: String,
        required: true
    },
    vaccineType: {
        type: String
    },
    vaccineBackground: {
        type: String
    },
    additionalServices: {
        type: String,
        required: true},
    numberChildren: {
        type: Number,
        required: true},
    overSixtyfive: {
        type: String,
        required: true},
    veteran: {
        type: String,
        required: true},
    ethnicity: {
        type: String,
        required: true},
    eventType:{
        type: String
        },
    eventDate:{
        type: String
        }
    
},
{
collection: 'individuals'
});
  

invidSchema.plugin(autoIncrement.plugin, 'individual');// Apply the Mongoose plugin that property  
module.exports = mongoose.model('individual', invidSchema)// Export the event schema to different file and allow mongoose model to interact with this eventSchema define
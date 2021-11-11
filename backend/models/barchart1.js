const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chartSchema = new Schema({
    _id: {
      type: String
    },
    total: {
      type: Number,
    }
  }, {
    collection: 'barchart1'
});

module.exports = mongoose.model('barchart1', chartSchema)

//versionKey: false 
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
    collection: 'barchart'
});

module.exports = mongoose.model('barchart', chartSchema)

//versionKey: false 
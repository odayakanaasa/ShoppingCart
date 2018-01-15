let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', schema);
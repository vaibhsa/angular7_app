var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    image_url: {type: String, required: true},
    role: {type: Number, required: false}
});

module.exports = mongoose.model('User', userSchema);
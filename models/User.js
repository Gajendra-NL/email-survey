const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema)
/*
* above line loads this schema to mongoose
* if only one argument like mongoose.model('users'),
* then it means pull a schema/model from mongoose
*/

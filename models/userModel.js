const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "User must have username"] 
    },
    password: {
        type: String,
        require: [true, "User must have password"]
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
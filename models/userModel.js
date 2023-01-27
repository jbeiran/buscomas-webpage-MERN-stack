const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        min: 8
    },
    role: {
        type: Number,
        default: 0
    },
    fav: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)

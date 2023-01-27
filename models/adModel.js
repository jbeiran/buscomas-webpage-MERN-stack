const mongoose  = require("mongoose");

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    province: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    phone2: {
        type: String,
        trim: true
    },
    phone3: {
        type: String,
        trim: true
    },
    phone4: {
        type: String,
        trim: true
    },
    phone5: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        default: [],
        required: true
    },
    category: {
        type: String,
        required: false
    },
    zone: {
        type: String,
        required: false,
        trim : true
    },
    date: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Ad", adSchema);
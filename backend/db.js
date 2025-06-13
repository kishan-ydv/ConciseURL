const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    urlCode:{
        type:String,
        required:true,
        unique:true
    },
    clicks: {
    type: Number,
    default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', urlSchema);
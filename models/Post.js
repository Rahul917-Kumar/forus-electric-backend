const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Post', postSchema)

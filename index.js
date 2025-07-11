const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const connectDB = require('./config/db')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
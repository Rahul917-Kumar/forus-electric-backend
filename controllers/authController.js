const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {

    const { name, email, password } = req.body || {}

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' })
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' })
    }

    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hash })

    res.status(201).json({ message: 'User registered successfully' })
}

exports.login = async (req, res) => {
    const { email, password } = req.body || {}

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token:token, user: { _id: user._id, name: user.name, email: user.email } })
}

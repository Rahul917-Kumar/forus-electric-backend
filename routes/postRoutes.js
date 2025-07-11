const express = require('express')
const protect = require('../middleware/authMiddleware')
const {
    createPost,
    getUserPosts,
    updatePost,
    deletePost
} = require('../controllers/postController')

const router = express.Router()

router.use(protect)

router.post('/', createPost)
router.get('/', getUserPosts)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router

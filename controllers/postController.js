const Post = require('../models/Post')

exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body || {}

    if (!title || !content || !tags) {
        return res.status(400).json({ message: 'Title, content, and tags are required' })
    }

    if (!Array.isArray(tags)) {
        return res.status(400).json({ message: 'Tags must be an array' })
    }

    const post = await Post.create({
        title,
        content,
        tags,
        userId: req.user._id,
    })

    res.status(201).json(post)
}

exports.getUserPosts = async (req, res) => {
    const posts = await Post.find({ userId: req.user._id })
    res.json(posts)
}

exports.updatePost = async (req, res) => {
    const { title, content, tags } = req.body || {}

    if (title !== undefined && typeof title !== 'string') {
        return res.status(400).json({ message: 'Title must be a string' })
    }

    if (content !== undefined && typeof content !== 'string') {
        return res.status(400).json({ message: 'Content must be a string' })
    }

    if (tags !== undefined && !Array.isArray(tags)) {
        return res.status(400).json({ message: 'Tags must be an array' })
    }

    const updated = await Post.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true }
    )

    if (!updated) {
        return res.status(404).json({ message: 'Post not found or unauthorized' })
    }

    res.json(updated)
}

exports.deletePost = async (req, res) => {
    let blog_id = req.params.id;
    if (!blog_id || blog_id.trim() === '') {
        return res.status(400).json({ message: 'Post ID is required' })
    }
    const deleted = await Post.findOneAndDelete({
        _id: blog_id,
        userId: req.user._id,
    })

    if (!deleted) {
        return res.status(404).json({ message: 'Post not found or unauthorized' })
    }

    res.json({ message: 'Post deleted successfully' })
}

exports.getPostById = async (req, res) => {
    try {
        let blog_id = req.params.id;
        if (!blog_id || blog_id.trim() === '') {
            return res.status(400).json({ message: 'Post ID is required' })
        }
        const post = await Post.findOne({
            _id: blog_id,
            userId: req.user._id,
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ message: "Error fetching post" });
    }
};
  

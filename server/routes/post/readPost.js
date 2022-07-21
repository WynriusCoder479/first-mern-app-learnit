const express = require('express')
const router = express.Router()
const verifyToken = require('../../middleware/auth')

const Post = require('../../models/Post')

//GET api/posts (Read all post) - Private route
router.get('/', verifyToken, async (req, res) => {
	//Poulate function retrieve users by post
	try {
		const posts = await Post.find({ user: req.userId }).populate('user', [
			'username'
		])
		res.json({ success: true, posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: `Internal server error` })
	}
})

module.exports = router

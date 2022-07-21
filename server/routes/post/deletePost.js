const express = require('express')
const router = express.Router()
const verifyToken = require('../../middleware/auth')

const Post = require('../../models/Post')

//DELETE api/posts (update post) - Private route

router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		//User not authorised to update post or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found in DB or user not authorised to delete post'
			})
		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: `Internal server error` })
	}
})

module.exports = router

const express = require('express')
const router = express.Router()
const verifyToken = require('../../middleware/auth')

const Post = require('../../models/Post')

//PUT api/posts (update post) - Private route

router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body

	//Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Titile is required' })

	try {
		let updatedPost = {
			title,
			description: description || ' ',
			url: (url.startsWith('https://') ? url : `https://${url}`) || ' ',
			status: status || 'TO LEARN'
		}

		const postUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		)

		//User not authorised to update post or post not found
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found in DB or user not authorised to update post'
			})

		res.json({
			success: true,
			message: 'Excellent porgress. All good !!!',
			post: updatedPost
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: `Internal server error` })
	}
})

module.exports = router

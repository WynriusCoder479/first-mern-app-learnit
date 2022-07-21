require('dotenv').config()
const express = require('express')
const router = express.Router()
const verifyToken = require('../../middleware/auth')

const User = require('../../models/User')

//GET api/auth (Check if user login) - Public route
router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})
module.exports = router

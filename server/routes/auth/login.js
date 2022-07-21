require('dotenv').config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

//POST api/auth/login (Register User) - Public route (Access anywere)
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	//simple validation username and password
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: `Missing username or/and password` })

	try {
		//check for existing user in DB
		const user = await User.findOne({ username })

		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect Username or/and password' })

		//username found
		const passwordValid = await argon2.verify(user.password, password)

		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or/and Password' })

		//Username found and password valid
		//return access token for user
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		return res.json({
			success: true,
			message: 'User login successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: `Internal server error` })
	}
})

module.exports = router

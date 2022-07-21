require('dotenv').config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

//POST api/auth/register (Register User) - Public route (Access anywere)
router.post('/register', async (req, res) => {
	const { username, password } = req.body

	//simple validation username and password
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: `Missing username or/and password` })

	try {
		//check for existing user in DB
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: `Username already taken` })

		//add new use to DB
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({
			username,
			password: hashedPassword
		})

		await newUser.save()

		//return access token for user
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		return res.json({
			success: true,
			message: 'User created successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: `Internal server error` })
	}
})

module.exports = router

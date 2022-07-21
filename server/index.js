require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const registerRoute = require('./routes/auth/register')
const loginRoute = require('./routes/auth/login')
const checkAuthRoute = require('./routes/auth/checkAuth')
const createPostRoute = require('./routes/post/createPost')
const realAllPostRoute = require('./routes/post/readPost')
const updatePostRoute = require('./routes/post/updatePost')
const deletePostRoute = require('./routes/post/deletePost')

const DbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit-list.js5oz.mongodb.net/?retryWrites=true&w=majority`
const connrctDB = async () => {
	try {
		await mongoose.connect(DbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connrctDB()
const authPath = '/api/auth'
const postPath = '/api/posts'
const accessControlAllow = 'Access-Control-Allow'

const app = express()
app.use((req, res, next) => {
	res.setHeader(`${accessControlAllow}-Origin`, process.env.REACT_URL)
	res.setHeader(
		`${accessControlAllow}-Methods`,
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	)
	res.setHeader(
		`${accessControlAllow}-Headers`,
		'X-Requested-With, content-type'
	)
	res.setHeader(`${accessControlAllow}-Credentials`, true)

	next()
})
app.use(express.json())

app.use(authPath, registerRoute)
app.use(authPath, loginRoute)
app.use(authPath, checkAuthRoute)
app.use(postPath, createPostRoute)
app.use(postPath, realAllPostRoute)
app.use(postPath, updatePostRoute)
app.use(postPath, deletePostRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

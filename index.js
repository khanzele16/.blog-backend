import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import {
	authMe,
	deleteUsers,
	getUsers,
	loginUser,
	registerUser,
} from './Controllers/authController.js'
import {
	createCommunity,
	getCommunities,
	getCommunity,
} from './Controllers/communityController.js'
import {
	createOne,
	deleteAll,
	deleteOne,
	getAll,
	getAvailableReactions,
	getOne,
	reactPost,
} from './Controllers/postController.js'
import { getUser, subscription } from './Controllers/userController.js'
import checkAuth from './Middleware/checkAuth.js'
import forId from './Middleware/forId.js'

const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

//app.use for parsing req.body and make it to json()
app.use(cors())
app.use(express.json())

//app router
//posts (routing)
app.get('/posts', forId, getAll)
app.get('/post/:id', forId, getOne)
app.delete('/post/:id', checkAuth, deleteOne)
app.post('/posts', checkAuth, createOne)
app.get('/reactions', getAvailableReactions)
app.get('/react', checkAuth, reactPost)

//images (routing)

//admin (routing)
app.get('/admin/users', getUsers)
app.delete('/admin/users', deleteUsers)
app.delete('/admin/posts', deleteAll)

//community (routing)
app.post('/community', createCommunity)
app.get('/communities', getCommunities)
app.get('/community/:nickname', getCommunity)

//user (routing)
app.get('/user/:username', getUser)

//for user (routing)
app.get('/subscribe', checkAuth, subscription)

//auth (routing)
app.post('/auth/register', registerUser)
app.post('/auth/login', loginUser)
app.get('/auth/me', checkAuth, authMe)

function start() {
	mongoose
		.connect(
			'mongodb+srv://test:12345@blogcluster.cmeplz5.mongodb.net/?retryWrites=true&w=majority&appName=blogCluster'
		)
		.then(() => console.log('Mongo is OK'))
		.catch(err => console.log(`Mongo is BAD: ${err}`))
	app.listen(4444, () => {
		console.log('PORT is 4444 and he is working')
	})
}

start()

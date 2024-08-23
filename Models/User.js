import { model, Schema } from 'mongoose'

const User = new Schema(
	{
		isUser: {
			type: Boolean,
			default: true,
		},
		avatarUrl: {
			type: String,
			required: true,
		},
		backgroundUrl: {
			type: String,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		about: {
			type: String,
		},
		subscribers: {
			type: Array,
			required: true,
			default: [],
		},
		subscriptions: {
			type: Array,
			required: true,
			default: [],
		},
		saves: {
			type: Object,
			required: true,
			default: { posts: [], comments: [] },
		},
		plus: {
			type: Object,
			required: true,
			default: {
				isPlus: false,
			},
		},
	},
	{
		timestamps: true,
	}
)

export default model('User', User)

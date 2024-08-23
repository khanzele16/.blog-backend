import { model, Schema } from 'mongoose'

const Community = new Schema(
	{
		isUser: {
			type: Boolean,
			default: false,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		nickname: {
			type: String,
			required: true,
		},
		avatarUrl: {
			type: String,
			required: true,
		},
		backgroundColor: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			required: true,
		},
		subscribers: {
			type: Array,
			required: true,
			default: [],
		},
	},
	{
		timestamps: true,
	}
)

export default model('Community', Community)

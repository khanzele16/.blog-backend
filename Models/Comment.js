import { Schema } from 'mongoose'

const Comment = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		reactions: {
			type: Array,
			required: true,
			default: [
				{ name: 'like', count: 5 },
				{ name: 'laugh', count: 2 },
			],
		},
	},
	{
		timestamps: true,
	}
)

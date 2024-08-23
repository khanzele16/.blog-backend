import { model, Schema } from 'mongoose'

const Post = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		blocks: {
			type: Array,
			required: true,
		},
		feedViewsCount: {
			type: Number,
			required: true,
			default: 0,
		},
		fullViewsCount: {
			type: Number,
			required: true,
			default: 0,
		},
		savesCount: {
			type: Number,
			required: true,
			default: 0,
		},
		reactions: {
			type: Object,
			required: true,
			default: {
				counters: [
					{
						id: 1,
						count: 0,
						users: [],
					},
					{
						id: 2,
						count: 0,
						users: [],
					},
					{
						id: 3,
						count: 0,
						users: [],
					},
					{
						id: 4,
						count: 0,
						users: [],
					},
					{
						id: 5,
						count: 0,
						users: [],
					},
					{
						id: 6,
						count: 0,
						users: [],
					},
					{
						id: 7,
						count: 0,
						users: [],
					},
					{
						id: 8,
						count: 0,
						users: [],
					},
					{
						id: 9,
						count: 0,
						users: [],
					},
					{
						id: 10,
						count: 0,
						users: [],
					},
					{
						id: 11,
						count: 0,
						users: [],
					},
					{
						id: 12,
						count: 0,
						users: [],
					},
					{
						id: 13,
						count: 0,
						users: [],
					},
					{
						id: 14,
						count: 0,
						users: [],
					},
					{
						id: 15,
						count: 0,
						users: [],
					},
					{
						id: 16,
						count: 0,
						users: [],
					},
					{
						id: 17,
						count: 0,
						users: [],
					},
					{
						id: 18,
						count: 0,
						users: [],
					},
					{
						id: 19,
						count: 0,
						users: [],
					},
					{
						id: 20,
						count: 0,
						users: [],
					},
					{
						id: 21,
						count: 0,
						users: [],
					},
				],
			},
		},
		comments: {
			type: Array,
			required: true,
			default: [],
		},
		subsite: {
			type: Object,
			required: true,
			default: {},
		},
		title: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
	}
)

export default model('Post', Post)

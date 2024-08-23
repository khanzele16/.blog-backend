import Post from '../Models/Post.js'
import User from '../Models/User.js'

export async function getUser(req, res) {
	try {
		const { username } = req.params
		const user = await User.findOne({ username })
		if (!user) {
			return res.status(400).json({
				message: 'Пользователь не был найден',
			})
		}
		const postMap = await Post.find({ owner: user.id }).select('reactions')
		const { passwordHash, ...uData } = user._doc
		return res.json({
			...uData,
			reactionsCount: postMap.reduce(
				(prev, post) =>
					prev +
					post.reactions.counters.reduce(
						(prev, reaction) => reaction.count + prev,
						0
					),
				0
			),
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось получить пользователя',
		})
	}
}

export async function subscription(req, res) {
	try {
		const { id: subscriberId } = req.query
		const subscriber = await User.findOne({ _id: req.userId })
		const target = await User.findOne({ _id: subscriberId })
		if (subscriberId === req.userId) {
			return res.status(400).json({
				message: 'Нельзя подписываться на самого себя',
			})
		}
		if (!subscriber) {
			return res.status(400).json({
				message: 'Пользователь, который подписывается, не был найден',
			})
		}
		if (!target) {
			return res.status(400).json({
				message: 'Пользователь, на которого подписываются, не был найден',
			})
		}
		const isSubscribed = subscriber.subscriptions.some(
			subscription => subscription._id.toString() == subscriberId.toString()
		)
		if (isSubscribed) {
			await subscriber.updateOne({
				$pull: { subscriptions: { _id: target.id } },
			})
			await target.updateOne({
				$pull: { subscribers: { _id: subscriber.id } },
			})

			return res.json({
				id: subscriberId,
				subscribed: false,
			})
		} else {
			// Subscribe: Add to both arrays
			await subscriber.updateOne({
				$push: {
					subscriptions: {
						_id: target.id,
						avatarUrl: target.avatarUrl,
						name: target.name,
						username: target.username,
						isUser: target.isUser,
					},
				},
			})
			await target.updateOne({
				$push: {
					subscribers: {
						_id: subscriber.id,
						avatarUrl: subscriber.avatarUrl,
						name: subscriber.name,
						username: subscriber.username,
						isUser: subscriber.isUser,
					},
				},
			})
			return res.json({
				id: subscriberId,
				subscribed: true,
			})
		}
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось подписаться на пользователя',
		})
	}
}
export async function getSaves(req, res) {
	try {
		const { id } = req.params
		const myUser = await User.findById(id)
		const idsSaves = myUser.saves
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось получить сохранненое',
		})
	}
}
export async function saveOne(req, res) {
	try {
		const { contentId, category } = req.query
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: '',
		})
	}
}

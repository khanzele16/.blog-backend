import Community from './../Models/Community.js'

export async function getCommunities(req, res) {
	try {
		const limit = 8
		const skip = Number(req.query.skip)
		const communities = await Community.find().skip(skip).limit(limit).lean()
		const communityLength = await Community.find()
		return res.json({
			data: communities,
			communityLength: communityLength.length,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось загрузить сообщества',
		})
	}
}
export async function createCommunity(req, res) {
	try {
		const { name, nickname, avatarUrl, backgroundColor, about } = req.body
		const condidate = await Community.find({ nickname })
		if (!condidate) {
			return res.status(400).json({
				message: 'Сообщество с таким названием уже существует',
			})
		}
		const community = new Community({
			name,
			nickname,
			backgroundColor,
			avatarUrl,
			about,
		})
		await community.save()
		return res.json({
			message: 'Сообщество успешно создано',
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось создать сообщество',
		})
	}
}
export async function getCommunity(req, res) {
	try {
		const { nickname } = req.params
		const community = await Community.findOne({ nickname })
		if (!community) {
			return res.status(400).json({
				message: 'Не удалось найти сообщество',
			})
		}
		return res.json({
			...community._doc,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось получить сообщество',
		})
	}
}

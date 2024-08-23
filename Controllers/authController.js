import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Post from '../Models/Post.js'
import User from './../Models/User.js'

export async function getUsers(req, res) {
	try {
		const allUsers = await User.find()
		if (allUsers.length == 0) {
			return res.json({
				message: 'На данный момент пользователей нет',
			})
		}
		const users = allUsers.map(obj => {
			const { passwordHash, ...uData } = obj._doc
			return { uData }
		})

		return res.json(users)
	} catch (err) {
		return res.status(500).json({
			message: 'Не удалось получить пользователей',
		})
	}
}
export async function loginUser(req, res) {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				message: 'Пользователя с данной почтой не найдено',
			})
		}
		const isValidPass = await bcrypt.compare(password, user.passwordHash)
		if (!isValidPass) {
			return res.status(400).json({
				message: 'Неверно введены пароль или почта',
			})
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'.blog24',
			{
				expiresIn: '30d',
			}
		)
		const { passwordHash, ...uData } = user._doc
		return res.json({ uData, token })
	} catch (err) {
		await res.status(500).json({
			message: 'Не удалось войти',
		})
	}
}
export async function registerUser(req, res) {
	try {
		const { email, password, username, name } = req.body
		const isBusyEmail = await User.findOne({ email })
		const isBusyUsername = await User.findOne({ username })
		if (isBusyEmail) {
			return res.status(400).json({
				message: 'Пользователь с такой почтой уже существует',
			})
		}
		if (isBusyUsername) {
			return res.status(400).json({
				message: 'Пользователь с таким именем уже существует',
			})
		}
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const avatarUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${
			name.split(' ')[0].split('')[0]
		}`
		const user = new User({
			name,
			email,
			passwordHash: hash,
			username,
			avatarUrl,
		})
		await user.save()
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'.blog24',
			{
				expiresIn: '30d',
			}
		)
		const { passwordHash, ...uData } = user._doc
		return res.json({
			uData,
			token,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: 'Не удалось зарегистрироваться' })
	}
}
export async function deleteUsers(req, res) {
	try {
		await User.deleteMany()
		await Post.deleteMany()
		return res.json({
			message: 'Пользователи успешно удалены',
		})
	} catch (err) {
		return res.status(500).json({
			message: 'Не удалось удалить всех пользователей',
		})
	}
}
export async function updateUser(req, res) {
	try {
		const { avatarUrl, backgroundUrl, email, username, name, about } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				message: 'Пользователь не был найден',
			})
		}
		await User.findOneAndUpdate(
			{ email },
			{ avatarUrl, backgroundUrl, name, about, username }
		)
		return res.json({
			message: 'Профиль был обновлён',
		})
	} catch (err) {
		return res.status(500).json({
			message: 'Не удалось обновить профиль',
		})
	}
}
export async function updateUser_Pass(req, res) {
	try {
		return res.json({
			message: 'На данный момент не сделано',
		})
	} catch (err) {
		return res.status(500).json()
	}
}
export async function authMe(req, res) {
	try {
		const user = await User.findById(req.userId)
		if (!user) {
			return res.status(400).json({
				message: 'Пользователь не найден',
			})
		}
		const { passwordHash, ...uData } = user._doc
		return res.json(uData)
	} catch (err) {
		return res.status(500).json('Нет доступа')
	}
}

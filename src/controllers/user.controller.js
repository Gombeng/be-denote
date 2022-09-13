const asyncHandler = require('express-async-handler');
const UserModel = require('../models/user.model');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;
	const userExist = await UserModel.findOne({ username });

	if (userExist) {
		res.status(404);
		throw new Error('Username sudah digunakan!');
	}

	const data = new UserModel({
		username,
		password,
	});

	try {
		await data.save();
		res.status(200).json({
			data,
			message: 'Sukses menambahkan data baru',
		});
	} catch (error) {
		next(error);
	}
});

const loginUser = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;
	const user = await UserModel.findOne({ username });

	if (!user) {
		res.status(404);
		throw new Error('Username tidak ditemukan!');
	}

	if (user && (await user.matchPassword(password))) {
		res.status(200).json({
			message: 'Sukses login',
			token: generateToken(user._id),
			data: user,
		});
	} else {
		res.status(402);
		throw new Error('Username / password salah!');
	}
});

const getAllUser = asyncHandler(async (req, res, next) => {
	try {
		const data = await UserModel.find();
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

const updateUser = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const data = await UserModel.findByIdAndUpdate(id, updatedData, options);

		res.send({
			message: 'Berhasil edit user!',
			data,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = { getAllUser, registerUser, loginUser, updateUser };

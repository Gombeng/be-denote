const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const { UserModel } = require('../models/user.model');

const getAllUsers = asyncHandler(async (req, res, next) => {
	try {
		const data = await UserModel.find();
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

const registerUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const userExist = await UserModel.findOne({ email });

	if (userExist) {
		res.status(404);
		throw new Error('email already used!');
	}

	const user = new UserModel({
		email,
		password,
	});

	try {
		await user.save();
		const token = generateToken(user._id);
		res.status(200).json({
			userId: user._id,
			token,
		});
	} catch (error) {
		next(error);
	}
});

const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error('User unregistered!');
	}

	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id);
		res.status(200).json({
			userId: user._id,
			token,
		});
	} else {
		res.status(402);
		throw new Error('Password wrong!');
	}
});

const updateUser = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const data = await UserModel.findByIdAndUpdate(id, updatedData, options);

		res.send({
			data,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = {
	getAllUsers,
	loginUser,
	registerUser,
	updateUser,
};

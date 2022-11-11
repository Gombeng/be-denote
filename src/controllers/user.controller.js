const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const { UserModel } = require('../models/user.model');

const getAll = asyncHandler(async (req, res, next) => {
	await UserModel.find()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => next(err));
});

const getByUserId = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	await UserModel.findById(id)
		.then((user) => {
			res.status(200).json({ data: user });
		})
		.catch((err) => next(err));
});

const registerUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const userExist = await UserModel.findOne({ email });

	if (userExist) {
		res.status(404);
		throw new Error('Email already used!');
	}

	const user = new UserModel({
		email,
		password,
	});

	await user
		.save()
		.then((user) => {
			const token = generateToken(user._id);
			res.status(200).json({
				token,
				data: user,
			});
		})
		.catch((err) => next(err));
});

const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error('User not found!');
	}

	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id);
		res.status(200).json({
			token,
			data: user,
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

const deleteUser = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	await UserModel.findByIdAndDelete(id)
		.then((user) => {
			res.status(200).json({ data: user, message: `User deleted` });
		})
		.catch((err) => next(err));
});

module.exports = {
	getAll,
	getByUserId,
	loginUser,
	registerUser,
	updateUser,
	deleteUser,
};

const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const UserModel = require('../models/user.model');
const NoteModel = require('../models/note.model');

const getAllUsers = asyncHandler(async (req, res, next) => {
	try {
		const data = await UserModel.find();
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

const getAllNotes = asyncHandler(async (req, res, next) => {
	// ! find user by id in user model
	UserModel.findOne({ _id: req.params.id })
		.populate('_notes')
		.exec()
		.then((data) => {
			res.send(data);
		})
		.catch((error) => {
			next(error);
		});
});

const addNote = asyncHandler(async (req, res, next) => {
	// ! find user by id in user model
	await UserModel.findOne({ _id: req.params.id })
		.then((user) => {
			// ! asign new note from req.body to newNote variable
			let newNote = new NoteModel(req.body);
			newNote._user = user._id;
			user._notes.push(newNote);
			user
				.save()
				.then((data) => {
					newNote
						.save()
						.then((data) => {
							res.send(data);
						})
						.catch((error) => {
							next(error);
						});
				})
				.catch((error) => {
					next(error);
				});
		})
		.catch((error) => {
			next(error);
		});
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
	getAllNotes,
	addNote,
	loginUser,
	registerUser,
	updateUser,
};

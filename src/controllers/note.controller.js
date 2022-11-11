const asyncHandler = require('express-async-handler');
const { UserModel, NoteModel } = require('../models/user.model');

const getAll = asyncHandler(async (req, res, next) => {
	await NoteModel.find()
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
});

const getById = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	await NoteModel.findById(id)
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
});

const getAllByUserId = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	await UserModel.findById(id)
		.populate('_notes')
		.exec()
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
});

const createNote = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	await UserModel.findById(id)
		.then((user) => {
			const newNote = new NoteModel(req.body);
			newNote._user = user._id;
			user._notes.push(newNote);
			user
				.save()
				.then((note) => {
					newNote
						.save()
						.then((note) => {
							res.status(200).json({ data: note });
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

const updateNote = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const options = { new: true };

	await NoteModel.findByIdAndUpdate(id, req.body, options)
		.then((note) => {
			res.status(200).json({ data: note });
		})
		.catch((error) => {
			next(error);
		});
});

const deleteNote = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const options = { new: true };

	await NoteModel.findByIdAndDelete(id)
		.then((note) => {
			res.status(200).json({ data: note, message: `note deleted` });
		})
		.catch((error) => {
			next(error);
		});
});

module.exports = {
	getAll,
	getById,
	getAllByUserId,
	createNote,
	updateNote,
	deleteNote,
};

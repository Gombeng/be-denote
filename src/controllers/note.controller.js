const asyncHandler = require('express-async-handler');
const NoteModel = require('../models/note.model');
const generateToken = require('../utils/generateToken');

const addNote = asyncHandler(async (req, res, next) => {
	const { title, note } = req.body;

	const newNote = new NoteModel({ title, note });

	try {
		await newNote.save();
		res.status(200).json({
			noteId: newNote._id,
		});
	} catch (error) {
		next(error);
	}
});

const updateNote = asyncHandler(async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const data = await NoteModel.findByIdAndUpdate(id, updatedData, options);

		res.send({
			data,
		});
	} catch (error) {
		next(error);
	}
});

const getAllNote = asyncHandler(async (req, res, next) => {
	try {
		const data = await NoteModel.find();
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

module.exports = { getAllNote, addNote, updateNote };

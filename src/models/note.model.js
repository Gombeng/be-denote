const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const NoteSchema = new Schema({
	_user: { type: ObjectId, ref: 'user' },
	title: { type: String, required: true },
	note: { type: String, required: true },
	create: { type: String, default: moment().format('Do MMM YY') },
});

const NoteModel = mongoose.model('note', NoteSchema);

module.exports = NoteModel;

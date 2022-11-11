const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const NoteSchema = new Schema({
	title: { type: String, required: true },
	note: { type: String, required: true },
	created: { type: String, default: moment().format('Do MMM YY') },
	_user: { type: ObjectId, ref: 'user' },
});

const NoteModel = mongoose.model('note', NoteSchema);

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		_notes: [{ type: ObjectId, ref: 'note' }],
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = { UserModel, NoteModel };

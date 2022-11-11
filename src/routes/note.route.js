const app = require('express')();
const {
	getAll,
	getAllByUserId,
	createNote,
	updateNote,
	deleteNote,
} = require('../controllers/note.controller');

app.get('/', getAll);
app.get('/:id', getAllByUserId);
app.post('/create/:id', createNote);
app.patch('/edit/:id', updateNote);
app.delete('/delete/:id', deleteNote);

module.exports = app;

const app = require('express')();
const {
	getAll,
	getAllByUserId,
	createNote,
	updateNote,
	deleteNote,
	getById,
} = require('../controllers/note.controller');

app.get('/', getAll);
app.get('/:id', getById);
app.get('/user/:id', getAllByUserId);
app.post('/create/:id', createNote);
app.patch('/edit/:id', updateNote);
app.delete('/delete/:id', deleteNote);

module.exports = app;

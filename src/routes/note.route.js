const app = require('express')();
const {
	getAllNote,
	updateNote,
	addNote,
} = require('../controllers/note.controller');

app.get('/getAll', getAllNote);
app.post('/add-note', addNote);
app.patch('/update/:id', updateNote);

module.exports = app;

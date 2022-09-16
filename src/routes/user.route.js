const app = require('express')();
const {
	getAllUsers,
	getAllNotes,
	registerUser,
	loginUser,
	updateUser,
	addNote,
} = require('../controllers/user.controller');

app.get('/', getAllUsers);
app.get('/:id/notes', getAllNotes);	
app.post('/login', loginUser);
app.post('/register', registerUser);
app.post('/add-note/:id', addNote);	
app.patch('/update/:id', updateUser);

module.exports = app;

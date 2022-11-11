const app = require('express')();
const {
	getAll,
	registerUser,
	loginUser,
	updateUser,
	getByUserId,
	deleteUser,
} = require('../controllers/user.controller');

app.get('/', getAll);
app.get('/:id', getByUserId);
app.post('/login', loginUser);
app.post('/register', registerUser);
app.patch('/update/:id', updateUser);
app.delete('/delete/:id', deleteUser);

module.exports = app;

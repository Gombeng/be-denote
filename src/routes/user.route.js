const app = require('express')();
const {
	getAllUsers,
	registerUser,
	loginUser,
	updateUser,
} = require('../controllers/user.controller');

app.get('/', getAllUsers);
app.post('/login', loginUser);
app.post('/register', registerUser);
app.patch('/update/:id', updateUser);

module.exports = app;

const app = require('express')();
const asyncHandler = require('express-async-handler');
const {
	registerUser,
	loginUser,
	getAllUser,
	updateUser,
} = require('../controllers/user.controller');

app.post('/login', loginUser);
app.post('/register', registerUser);
app.get('/getAll', getAllUser);
app.patch('/edit/:id', updateUser);
module.exports = app;

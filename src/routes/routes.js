const app = require('express')();
const userRoutes = require('./user.route');
const noteRoutes = require('./note.route');

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

module.exports = app;

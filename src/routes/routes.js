const app = require('express')();
const userRoutes = require('./user.route');

app.use('/user', userRoutes);

module.exports = app;

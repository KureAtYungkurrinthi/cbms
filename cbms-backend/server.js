const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Initiate express.js
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))

// Routes
app.use('/v1/auth', require('./routes/auth'));
// app.use('/v1/users', require('./routes/users'));
// app.use('/v1/rooms', require('./routes/rooms'));
// app.use('/v1/meetings', require('./routes/meetings'));


// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
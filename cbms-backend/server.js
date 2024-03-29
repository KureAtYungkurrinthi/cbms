// Import libraries
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const verifier = require('./lib/verifier');

// Initiate express.js
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Put all routes here
app.use('/v1/auth', require('./routes/auth'));

app.use(verifier.verifyJWT);
app.use('/v1/users', require('./routes/users'));
// app.use('/v1/rooms', require('./routes/rooms'));
// app.use('/v1/meetings', require('./routes/meetings'));

// Catch-all for unhandled routes
app.all('*', (req, res) => {
    res.sendStatus(404);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

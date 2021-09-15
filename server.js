require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const connectDB = require('./config/db');

const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get('/status', (req, res) => {
  res.send('Server running...');
});

app.use('/api/users', userRoute);
app.use('/api/notes', noteRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

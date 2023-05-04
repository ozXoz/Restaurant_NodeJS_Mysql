// app.js

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes'); // Add this line
const cors = require('cors'); // Add this line

const app = express();
app.use(cors()); // Add this line
app.use(bodyParser.json());
app.use('/auth', authRoutes);
// app.use('/', employeeRoutes);
app.use('/employee', employeeRoutes); // Change this line

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
require('dotenv').config();
const mongoose = require("mongoose");

// Encode username and password
const username = encodeURIComponent("sai");
const password = encodeURIComponent("Mongodb!#%&(13579");

// Specify the database name (pioneer) in the MongoDB connection URI
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.p3rrq1q.mongodb.net/pioneer?retryWrites=true&w=majority&appName=Cluster0`);

const authRoutes = require('./src/routes/authRoutes');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
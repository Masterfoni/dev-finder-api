const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-5ytfa.mongodb.net/devfinder?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
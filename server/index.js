const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/info', require('./routes/info.route.js'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://vitaliykulik:qwerty6503@cluster0.qhpylrn.mongodb.net/');
        app.listen(PORT, () => {
            console.log("Server started");

        });
    } catch (error) {
        console.log(error);

    }
}

start();
const express = require('express');
const mongoose = require('mongoose');
const { mongodbUrl } = require('./config');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.route'));

async function start() {
    try {
        await mongoose.connect(mongodbUrl);
        app.listen(PORT, () => {
            console.log("Server started");

        });
    } catch (error) {
        console.log(error);

    }
}

start();
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const bp = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect(config.get("connection-string"), (error) => {
    if(error) return console.log("connection error")
    return console.log("connected");
})

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use("/api/post", require('./routes/post'));
app.use("/api/account", require('./routes/account'));
app.use("/api/login", require('./routes/loggin'));
app.use("/api/comment", require('./routes/comment'))
app.use("/api/reaction", require('./routes/reaction'))

app.listen(3000, () => {
    console.log("Start listen on port 3000");
})

const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
console.log(config.get("connection-string").replace('{login}',config.get('DB_LOGIN')).replace('{password}',config.get('DB_PASSWORD')))
mongoose.connect(config.get("connection-string").replace('{login}',config.get('DB_LOGIN')).replace('{password}',config.get('DB_PASSWORD')), (error) => {
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
app.use("/api/category", require('./routes/category'))
app.use(express.static('public'))

const PORT  = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Start listen on port ${PORT}`);
})

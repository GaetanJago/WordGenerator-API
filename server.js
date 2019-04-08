const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');

const routes = require('./route/routes');

const app = express();

app.use(cors());
const PORT = process.env.PORT || 12345;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const address = "mongodb://127.0.0.1/WordGenerator";

mongoose.connect(address, function (err) {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
}
});

routes(app);


// Start up the Node server
app.listen(PORT, function (){
    console.log(`Node server listening on http://localhost:${PORT}`);
});

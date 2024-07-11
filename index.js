const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes());


app.listen(3000);
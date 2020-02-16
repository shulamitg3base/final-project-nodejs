var emailRouter = require('./emailsRouter');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.listen(5000, () => console.log("Server is listening on port 5000"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/emails', emailRouter);


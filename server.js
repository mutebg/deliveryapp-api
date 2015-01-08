var express = require('express');
var app = express();
var bodyParser     	= require("body-parser");
var cors = require('cors');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'thisIsNotSecretKey';

//@TODO to get users from DB
var user = {
    username: 'demo',
    password: 'demo'
};

app.use( cors() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( expressJwt({ secret: jwtSecret }).unless({ path: [ '/login' ]}) );

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deliveryapp');

app.use('/products', 	require('./controllers/products'));
app.use('/orders', 		require('./controllers/orders'));
app.use('/delivery', 	require('./controllers/delivery'));
app.use('/map', 		require('./controllers/map'));

app.post('/login', authenticate, function(req, res) {
    var token = jwt.sign({
        username: user.username
    }, jwtSecret, {
        expiresInMinutes: 1200
    });
    
    res.send({
        token: token
    });
});

function authenticate(req, res, next) {
    var body = req.body;
    if (!body.username || !body.password) {
        res.status(400).end('Must provide username or password');
        return;
    }
    if (body.username !== user.username || body.password !== user.password) {
        res.status(401).end('Username or password incorrect');
        return;
    }
    next();
}


var server = app.listen(3003, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
})
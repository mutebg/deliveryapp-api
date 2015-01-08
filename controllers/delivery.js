var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deliverySchema = Schema({
	//_id: mongoose.Schema.ObjectId,
	date_start: Date,
	date_end: Date,
	orders: [{ type: Schema.Types.ObjectId, ref: 'orders' }]
});

var DeliveryModel = mongoose.model('Delivery', deliverySchema);


router.get('/', function(req, res){
	res.send('ok');
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = Schema({
	//_id: mongoose.Schema.ObjectId,
	status: Number,
	from: String,
	to: String,
	name: String,
	date_add: { type: Date, default: Date.now },
	date_start: Date,
	date_end: Date,
	products: [{
		id: { type: Schema.Types.ObjectId, ref: 'products' },
		name: String,
		price: Number,
		qty: Number
	}]
});

var OrdersModel = mongoose.model('Orders', ordersSchema);

router.get('/', function(req, res) {
	OrdersModel.find( function(err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
});

//get order
router.get('/:id', function(req, res) {
	OrdersModel
		.findOne( {_id : req.params.id} )
		.populate( {path: 'products'} )
		.exec(function (err, data) {
			if ( err ) {
				res.send(err);
			}

			var options = {
		      path: 'products.id',
		      model: 'Products',
		      select: 'name price'
		    };

		    if (err) return res.json(500);
		    OrdersModel.populate(data, options, function (err, projects) {
		      	res.json(projects);
		    });

			//res.json(data);	
		});
});

//create order
router.post('/', function(req, res) {
	var post = req.body;
	OrdersModel.create( post, function(err, data) {
		if (err) {
			res.send(err);
		} 
		res.json({'success': true, order: data});	
	});
});

//update product
router.post('/:id', function(req, res) {
	var data = req.body;
	OrdersModel.update({ _id : req.params.id }, data, function(err, data) {
		if (err) {
			res.send(err)
		} 
		res.json({'success': true});
	});
});

module.exports = router;
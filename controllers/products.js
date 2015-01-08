var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
	//_id: mongoose.Schema.ObjectId,
	name: String,
	qty: Number,
	price: Number
});

var ProductsModel = mongoose.model('Products', productSchema);

router.get('/', function(req, res) {
	ProductsModel.find( function(err, data) {
		if (err) {
			res.send(err);
		}
		res.json(data);
	});
});

//get product
router.get('/:id', function(req, res) {
	ProductsModel.findOne( {url : req.params.id}, function(err, data) {
		if ( err ) {
			res.send(err);
		}
		res.json(data);	
	});	
});

//create product
router.post('/', function(req, res) {
	var post = req.body;
	console.log('add products');
	ProductsModel.create( post, function(err, data) {
		if (err) {
			res.send(err); 

		} else {
			res.json({'success': true, product: data})	
		};	
	});
});

//update product
router.post('/:id', function(req, res) {
	var data = req.body;
	console.log('edit products');
	ProductsModel.update({ _id : req.params.id }, data, function(err, data) {
		if (err) {
			res.send(err)
		} else { 
			res.json({'success': true});
		}
	});
});

//delete product
router.delete('/:id', function(req, res) {
	ProductsModel.remove({ _id : req.params.id }, function(err, user) {
		if (err) {
			res.send(err);
		}
		res.json({'success': true});
	});
});

module.exports = router;
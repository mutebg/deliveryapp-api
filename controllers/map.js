var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
	
	var from = req.body.from;
	var destinations = req.body.destinations;
	var url = 'https://maps.googleapis.com/maps/api/directions/json?';
	url += 'origin=' +  from + '&';
	url += 'destination=' +  from + '&';
	url += 'waypoints=optimize:true|' + destinations
	url += 'key=AIzaSyCTsOT6gFa_cOuwqgAt69zplh-nhCXCj68';

	var request = require('request');
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json( JSON.parse(body) );
		}
	})
});

module.exports = router;
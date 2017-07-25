var express = require('express');
var router = express.Router();

// request http header
router.get('/', function (req, res) {
	res.set('Content-Type', 'text/plain');
	var s = '';
	for(var name in req.headers) 
		s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
})

module.exports = router;
const express = require('express');
const router = express.Router();

// request http header
router.get('/', function (req, res) {
	res.set('Content-Type', 'text/plain');
	const s = '';
	for(const name in req.headers) 
		s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
})

module.exports = router;
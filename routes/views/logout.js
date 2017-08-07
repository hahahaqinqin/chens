const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
 

/* GET logout page. */
router.get('/', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
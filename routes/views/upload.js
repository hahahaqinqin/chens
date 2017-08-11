const cloudinary = require('cloudinary');
const express = require('express');
const router = express.Router();

// request http header
router.get('/', function (req, res) {
	cloudinary.uploader.upload("public/front/assets/images/banner.jpg", function (result) {
		res.send(result);
	})
})

module.exports = router;